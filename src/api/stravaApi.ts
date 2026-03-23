/**
 * Strava API Client
 * Handles all HTTP requests to the Strava backend service.
 */

import type {
  StravaApiResponse,
  YearToDateStats,
  RecentActivities,
  MonthlyStats,
  LeaderboardResponse,
  OAuthStatus,
  StravaError
} from './stravaTypes';

function getApiBaseUrl(): string {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    }
  }

  return 'https://api.vuhnger.dev';
}

const API_BASE_URL = getApiBaseUrl();

/**
 * Handle API errors consistently
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `Request failed: ${response.statusText}`;

    try {
      const errorData: StravaError = await response.json();
      errorMessage = errorData.detail || errorData.error || errorMessage;
    } catch {
      // If parsing error response fails, use default message
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Initiate Strava OAuth flow
 * Redirects user to Strava authorization page
 */
export function initiateStravaAuth(page: 'home' | 'strava' | 'leaderboard' = 'strava'): void {
  const url = new URL(`${API_BASE_URL}/strava/authorize`);
  url.searchParams.set('page', page);
  window.location.href = url.toString();
}

/**
 * Check if the current URL contains OAuth callback parameters
 * @returns true if this is an OAuth callback with success parameter
 */
export function isOAuthCallback(): boolean {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('strava');
  return status === 'success' || status === 'error';
}

export function getOAuthStatus(): OAuthStatus {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('strava');
  const message = params.get('message');

  if (status === 'success' || status === 'error') {
    return {
      status,
      message,
    };
  }

  return {
    status: null,
    message: null,
  };
}

/**
 * Clear OAuth callback parameters from URL
 */
export function clearOAuthParams(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('strava');
  url.searchParams.delete('code');
  url.searchParams.delete('scope');
  url.searchParams.delete('message');
  window.history.replaceState({}, '', url.toString());
}

/**
 * Get year-to-date stats (runs + rides)
 * @returns YTD statistics wrapped in API response
 */
export async function getYearToDateStats(): Promise<StravaApiResponse<YearToDateStats>> {
  const response = await fetch(`${API_BASE_URL}/strava/stats/ytd`, {
    method: 'GET',
    credentials: 'include', // Include cookies for session
    headers: {
      'Accept': 'application/json',
    },
  });

  return handleResponse<StravaApiResponse<YearToDateStats>>(response);
}

/**
 * Get recent 30 activities
 * @returns Recent activities wrapped in API response
 */
export async function getRecentActivities(): Promise<StravaApiResponse<RecentActivities>> {
  const response = await fetch(`${API_BASE_URL}/strava/stats/activities`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  return handleResponse<StravaApiResponse<RecentActivities>>(response);
}

/**
 * Get monthly aggregated stats (last 12 months)
 * @returns Monthly statistics wrapped in API response
 */
export async function getMonthlyStats(): Promise<StravaApiResponse<MonthlyStats>> {
  const response = await fetch(`${API_BASE_URL}/strava/stats/monthly`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  return handleResponse<StravaApiResponse<MonthlyStats>>(response);
}

export async function getLeaderboard(
  activity: 'run' | 'ride' | 'swim',
  period: 'ytd' | '30d' | '7d' = 'ytd',
  options?: { signal?: AbortSignal }
): Promise<StravaApiResponse<LeaderboardResponse>> {
  const url = new URL(`${API_BASE_URL}/strava/stats/leaderboard`);
  url.searchParams.set('activity', activity);
  url.searchParams.set('period', period);

  const response = await fetch(url.toString(), {
    method: 'GET',
    credentials: 'include',
    signal: options?.signal,
    headers: {
      'Accept': 'application/json',
    },
  });

  return handleResponse<StravaApiResponse<LeaderboardResponse>>(response);
}

/**
 * Check if user is authenticated with Strava
 * This is a convenience method that attempts to fetch YTD stats
 * @returns true if authenticated, false otherwise
 */
export async function checkStravaAuth(): Promise<boolean> {
  try {
    await getYearToDateStats();
    return true;
  } catch (error) {
    return false;
  }
}
