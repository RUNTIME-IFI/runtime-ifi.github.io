import React, { useEffect, useState } from 'react';
import {
  initiateStravaAuth,
  isOAuthCallback,
  clearOAuthParams,
  getYearToDateStats,
  getRecentActivities,
  getMonthlyStats
} from '../../api/stravaApi';
import type {
  YearToDateStats,
  RecentActivities,
  MonthlyStats,
  Activity
} from '../../api/stravaTypes';
import {
  convertMetersToKm,
  convertSecondsToTime,
  formatSpeed,
  formatDate
} from '../../api/stravaTypes';
import './StravaStats.css';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface DataState {
  ytd: YearToDateStats | null;
  activities: RecentActivities | null;
  monthly: MonthlyStats | null;
}

const StravaStats: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [data, setData] = useState<DataState>({
    ytd: null,
    activities: null,
    monthly: null
  });

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (isOAuthCallback()) {
        clearOAuthParams();
        await fetchAllData();
      }
    };

    handleOAuthCallback();
  }, []);

  const fetchAllData = async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const [ytdResponse, activitiesResponse, monthlyResponse] = await Promise.all([
        getYearToDateStats(),
        getRecentActivities(),
        getMonthlyStats()
      ]);

      setData({
        ytd: ytdResponse.data,
        activities: activitiesResponse.data,
        monthly: monthlyResponse.data
      });

      setIsAuthenticated(true);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Strava data');
      setLoadingState('error');
    }
  };

  const handleConnect = () => {
    initiateStravaAuth();
  };

  const handleRefresh = () => {
    fetchAllData();
  };

  if (loadingState === 'idle' || (loadingState === 'error' && !isAuthenticated)) {
    return (
      <div className="page-container">
        <div className="strava-page">
          <div className="strava-hero">
            <h1 className="strava-title">STRAVA STATS</h1>
            <p className="strava-subtitle">CONNECT YOUR STRAVA ACCOUNT TO VIEW YOUR ACTIVITY DATA</p>

            {error && (
              <div className="strava-error">
                <p>{error}</p>
              </div>
            )}

            <button className="strava-connect-btn" onClick={handleConnect}>
              CONNECT STRAVA
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loadingState === 'loading') {
    return (
      <div className="page-container">
        <div className="strava-page">
          <div className="strava-loading">
            <div className="loading-spinner"></div>
            <p>LOADING STRAVA DATA...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="strava-page">
        <div className="strava-header">
          <h1 className="strava-title">STRAVA STATS</h1>
          <button className="strava-refresh-btn" onClick={handleRefresh}>
            REFRESH
          </button>
        </div>

        {error && (
          <div className="strava-error">
            <p>{error}</p>
          </div>
        )}

        {/* Year-to-Date Stats */}
        {data.ytd && (
          <section className="strava-section">
            <h2 className="section-heading">YEAR TO DATE</h2>
            <div className="stats-grid">
              <div className="stat-card run-card">
                <h3 className="stat-type">RUNS</h3>
                <div className="stat-details">
                  <div className="stat-item">
                    <span className="stat-label">Activities</span>
                    <span className="stat-value">{data.ytd.run_totals.count}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Distance</span>
                    <span className="stat-value">{convertMetersToKm(data.ytd.run_totals.distance)} km</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Time</span>
                    <span className="stat-value">{convertSecondsToTime(data.ytd.run_totals.moving_time)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Elevation</span>
                    <span className="stat-value">{Math.round(data.ytd.run_totals.elevation_gain)} m</span>
                  </div>
                </div>
              </div>

              <div className="stat-card ride-card">
                <h3 className="stat-type">RIDES</h3>
                <div className="stat-details">
                  <div className="stat-item">
                    <span className="stat-label">Activities</span>
                    <span className="stat-value">{data.ytd.ride_totals.count}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Distance</span>
                    <span className="stat-value">{convertMetersToKm(data.ytd.ride_totals.distance)} km</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Time</span>
                    <span className="stat-value">{convertSecondsToTime(data.ytd.ride_totals.moving_time)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Elevation</span>
                    <span className="stat-value">{Math.round(data.ytd.ride_totals.elevation_gain)} m</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Activities */}
        {data.activities && data.activities.activities.length > 0 && (
          <section className="strava-section">
            <h2 className="section-heading">RECENT ACTIVITIES</h2>
            <div className="activities-list">
              {data.activities.activities.slice(0, 10).map((activity: Activity) => (
                <div key={activity.id} className={`activity-card ${(activity.type || 'unknown').toLowerCase()}`}>
                  <div className="activity-header">
                    <h3 className="activity-name">{activity.name}</h3>
                    <span className="activity-type">{activity.type}</span>
                  </div>
                  <div className="activity-stats">
                    <div className="activity-stat">
                      <span className="stat-label">Distance</span>
                      <span className="stat-value">{convertMetersToKm(activity.distance)} km</span>
                    </div>
                    <div className="activity-stat">
                      <span className="stat-label">Time</span>
                      <span className="stat-value">{convertSecondsToTime(activity.moving_time)}</span>
                    </div>
                    <div className="activity-stat">
                      <span className="stat-label">Elevation</span>
                      <span className="stat-value">{Math.round(activity.total_elevation_gain)} m</span>
                    </div>
                    {activity.average_speed && (
                      <div className="activity-stat">
                        <span className="stat-label">Avg Speed</span>
                        <span className="stat-value">{formatSpeed(activity.average_speed)}</span>
                      </div>
                    )}
                  </div>
                  <div className="activity-footer">
                    <span className="activity-date">{formatDate(activity.start_date)}</span>
                    {activity.kudos_count !== undefined && activity.kudos_count > 0 && (
                      <span className="activity-kudos">{activity.kudos_count} kudos</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Monthly Summary */}
        {data.monthly && (
          <section className="strava-section">
            <h2 className="section-heading">MONTHLY SUMMARY</h2>
            <div className="monthly-grid">
              {data.monthly.months.slice(0, 6).map((month) => (
                <div key={month.month} className="month-card">
                  <h3 className="month-label">{month.month}</h3>
                  <div className="month-stats">
                    <div className="month-stat">
                      <span className="stat-label">Activities</span>
                      <span className="stat-value">{month.total_count}</span>
                    </div>
                    <div className="month-stat">
                      <span className="stat-label">Distance</span>
                      <span className="stat-value">{convertMetersToKm(month.total_distance)} km</span>
                    </div>
                    <div className="month-stat">
                      <span className="stat-label">Time</span>
                      <span className="stat-value">{convertSecondsToTime(month.total_moving_time)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StravaStats;
