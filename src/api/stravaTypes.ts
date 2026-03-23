/**
 * Strava API Response Types
 * These match the structure returned by the backend API at api.vuhnger.dev
 */

// Base response wrapper
export interface StravaApiResponse<T> {
  type: 'ytd' | 'recent_activities' | 'monthly' | 'leaderboard';
  data: T;
  fetched_at: string; // ISO timestamp
}

// Year-to-date stats
export interface YearToDateStats {
  run_totals: ActivityTotals;
  ride_totals: ActivityTotals;
}

export interface ActivityTotals {
  count: number;
  distance: number; // meters
  moving_time: number; // seconds
  elapsed_time: number; // seconds
  elevation_gain: number; // meters
  achievement_count?: number;
}

// Recent activities
export interface RecentActivities {
  activities: Activity[];
  count: number;
}

export interface Activity {
  id: number;
  name: string;
  type: string; // e.g., "Run", "Ride"
  start_date: string; // ISO timestamp
  distance: number; // meters
  moving_time: number; // seconds
  elapsed_time: number; // seconds
  total_elevation_gain: number; // meters
  average_speed?: number; // meters/second
  max_speed?: number; // meters/second
  average_heartrate?: number;
  max_heartrate?: number;
  kudos_count?: number;
}

// Monthly stats
export interface MonthlyStats {
  months: MonthlyAggregate[];
  summary: {
    total_activities: number;
    total_distance: number; // meters
    total_moving_time: number; // seconds
    total_elevation_gain: number; // meters
  };
}

export interface MonthlyAggregate {
  month: string; // e.g., "2024-01"
  run_count: number;
  run_distance: number; // meters
  run_moving_time: number; // seconds
  run_elevation_gain: number; // meters
  ride_count: number;
  ride_distance: number; // meters
  ride_moving_time: number; // seconds
  ride_elevation_gain: number; // meters
  total_count: number;
  total_distance: number; // meters
  total_moving_time: number; // seconds
  total_elevation_gain: number; // meters
}

export interface LeaderboardResponse {
  activity: 'run' | 'ride' | 'swim';
  period: 'ytd' | '30d' | '7d';
  total_athletes: number;
  entries: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  rank: number;
  athlete_id: number;
  athlete_name: string;
  avatar_url?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  metrics: LeaderboardMetrics;
  totals: ActivityTotals;
}

export interface LeaderboardMetrics {
  primary_label: string;
  primary_value: number;
  secondary_label: string;
  secondary_value: number;
  tertiary_label: string;
  tertiary_value?: number | null;
}

// Error response
export interface StravaError {
  error: string;
  detail?: string;
}

export interface OAuthStatus {
  status: 'success' | 'error' | null;
  message: string | null;
}

// Unit conversion helpers (for display)
export const convertMetersToKm = (meters: number): number => {
  return Math.round((meters / 1000) * 10) / 10;
};

export const convertSecondsToHours = (seconds: number): number => {
  return Math.round((seconds / 3600) * 10) / 10;
};

export const convertSecondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

export const formatSpeed = (metersPerSecond: number): string => {
  const kmPerHour = metersPerSecond * 3.6;
  return `${Math.round(kmPerHour * 10) / 10} km/h`;
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatLocation = (
  city?: string | null,
  state?: string | null,
  country?: string | null
): string | null => {
  const parts = [city, state, country].filter((value): value is string => Boolean(value && value.trim()));
  return parts.length > 0 ? parts.join(', ') : null;
};

export const formatPacePerKm = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '-';
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')} /km`;
};

export const formatPacePer100m = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '-';
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')} /100m`;
};

export const formatMeters = (meters: number): string => {
  return `${Math.round(meters)} m`;
};
