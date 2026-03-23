import React, { useEffect, useMemo, useState } from 'react'
import { StravaLogo } from '../../components'
import { clearOAuthParams, getLeaderboard, getOAuthStatus, initiateStravaAuth } from '../../api/stravaApi'
import type { LeaderboardEntry, LeaderboardResponse } from '../../api/stravaTypes'
import {
  convertMetersToKm,
  convertSecondsToTime,
  formatLocation,
  formatMeters,
  formatPacePer100m,
  formatPacePerKm,
} from '../../api/stravaTypes'
import './Leaderboard.css'

type ActivityFilter = 'run' | 'ride' | 'swim'
type PeriodFilter = 'ytd' | '30d' | '7d'
type LoadingState = 'idle' | 'loading' | 'success' | 'error'

const activityCopy: Record<ActivityFilter, { empty: string }> = {
  run: {
    empty: 'INGEN LOPERE HAR KOBLET TIL STRAVA ENNAA.',
  },
  ride: {
    empty: 'INGEN SYKLISTER HAR KOBLET TIL STRAVA ENNAA.',
  },
  swim: {
    empty: 'INGEN SVOMMERE HAR KOBLET TIL STRAVA ENNAA.',
  },
}

const Leaderboard: React.FC = () => {
  const [activity, setActivity] = useState<ActivityFilter>('run')
  const [period, setPeriod] = useState<PeriodFilter>('ytd')
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [oauthMessage, setOauthMessage] = useState<string | null>(null)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null)
  const signupTriggerRef = React.useRef<HTMLButtonElement | null>(null)
  const modalRef = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const oauthStatus = getOAuthStatus()

    if (oauthStatus.status === 'success') {
      setOauthMessage('STRAVA ER KOBLET TIL. TALLENE DINE KOMMER INN PAA TAVLA VED NESTE OPPDATERING.')
      clearOAuthParams()
    }

    if (oauthStatus.status === 'error') {
      setError(oauthStatus.message ?? 'Kunne ikke koble til Strava.')
      clearOAuthParams()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const fetchLeaderboard = async () => {
      setLoadingState('loading')
      setError(null)

      try {
        const response = await getLeaderboard(activity, period, { signal: controller.signal })
        setLeaderboard(response.data)
        setLoadingState('success')
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'Kunne ikke hente tavla.')
        setLoadingState('error')
      }
    }

    fetchLeaderboard()

    return () => {
      controller.abort()
    }
  }, [activity, period])

  useEffect(() => {
    if (!isSignupOpen || !modalRef.current) {
      return undefined
    }

    const modalElement = modalRef.current
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusableElements = Array.from(modalElement.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((element) => !element.hasAttribute('disabled'))

    focusableElements[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsSignupOpen(false)
        return
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) {
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      signupTriggerRef.current?.focus()
    }
  }, [isSignupOpen])

  const topThree = useMemo(() => leaderboard?.entries.slice(0, 3) ?? [], [leaderboard])
  const rest = useMemo(() => leaderboard?.entries.slice(3) ?? [], [leaderboard])

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-hero">
        <button
          type="button"
          className="leaderboard-signup-button"
          ref={signupTriggerRef}
          onClick={() => setIsSignupOpen(true)}
        >
          <StravaLogo />
          KOBLE TIL STRAVA
        </button>
      </div>

      <div className="leaderboard-toolbar">
        <div className="leaderboard-control-stack">
          <div className="leaderboard-filter-group" aria-label="Velg aktivitet">
            <FilterButton label="LOPING" active={activity === 'run'} onClick={() => setActivity('run')} />
            <FilterButton label="SYKLING" active={activity === 'ride'} onClick={() => setActivity('ride')} />
            <FilterButton label="SVOMMING" active={activity === 'swim'} onClick={() => setActivity('swim')} />
          </div>

          <div className="leaderboard-period-group" aria-label="Velg periode">
            <FilterButton label="YTD" active={period === 'ytd'} onClick={() => setPeriod('ytd')} />
            <FilterButton label="30D" active={period === '30d'} onClick={() => setPeriod('30d')} />
            <FilterButton label="7D" active={period === '7d'} onClick={() => setPeriod('7d')} />
          </div>
        </div>
      </div>

      {oauthMessage && (
        <div className="leaderboard-banner success">
          <p>{oauthMessage}</p>
        </div>
      )}

      {error && (
        <div className="leaderboard-banner error">
          <p>{error}</p>
        </div>
      )}

      {loadingState === 'loading' && (
        <div className="leaderboard-loading">
          <div className="loading-spinner"></div>
          <p>LASTER TAVLA...</p>
        </div>
      )}

      {loadingState === 'success' && leaderboard && leaderboard.entries.length > 0 && (
        <>
          <div className="leaderboard-top-grid">
            {topThree.map((entry) => (
              <TopEntryCard key={entry.athlete_id} activity={activity} entry={entry} />
            ))}
          </div>

          <div className="leaderboard-table-card">
            <div className="leaderboard-table-header">
              {tableHeaders(activity).map((header) => (
                <span key={header}>{header}</span>
              ))}
            </div>

            <div className="leaderboard-table-body">
              {[...topThree, ...rest].map((entry) => (
                <LeaderboardRow key={entry.athlete_id} activity={activity} entry={entry} />
              ))}
            </div>
          </div>
        </>
      )}

      {loadingState === 'success' && leaderboard && leaderboard.entries.length === 0 && (
        <div className="leaderboard-empty-state">
          <p>{activityCopy[activity].empty} BLI DEN FORSTE PAA TAVLA.</p>
        </div>
      )}

      {isSignupOpen && (
        <div className="leaderboard-modal-backdrop" onClick={() => setIsSignupOpen(false)}>
          <div
            className="leaderboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leaderboard-signup-title"
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="leaderboard-modal-close"
              aria-label="Lukk"
              onClick={() => setIsSignupOpen(false)}
            >
              x
            </button>

            <div className="leaderboard-modal-icon">
              <StravaLogo />
            </div>
            <h2 id="leaderboard-signup-title" className="styled-heading styled-heading-h2 leaderboard-modal-title">BLI MED PAA TAVLA</h2>
            <button
              type="button"
              className="leaderboard-connect-button"
              onClick={() => initiateStravaAuth('leaderboard')}
            >
              <StravaLogo />
              FORTSETT MED STRAVA
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const FilterButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    type="button"
    className={`leaderboard-filter ${active ? 'active' : ''}`}
    aria-pressed={active}
    onClick={onClick}
  >
    {label}
  </button>
)

const TopEntryCard: React.FC<{ activity: ActivityFilter; entry: LeaderboardEntry }> = ({ activity, entry }) => {
  const location = formatLocation(entry.city, entry.state, entry.country)

  return (
    <article className={`leaderboard-podium-card place-${entry.rank}`}>
      <span className="leaderboard-podium-rank">#{entry.rank}</span>
      <div className="leaderboard-avatar-shell">
        {entry.avatar_url ? (
          <img className="leaderboard-avatar" src={entry.avatar_url} alt={entry.athlete_name} />
        ) : (
          <span className="leaderboard-avatar-fallback">{entry.athlete_name.charAt(0)}</span>
        )}
      </div>
      <h2 className="leaderboard-athlete-name">{entry.athlete_name}</h2>
      {location && <p className="leaderboard-athlete-location">{location}</p>}
      <div className="leaderboard-podium-metric">
        <span>{primaryMetricLabel(activity)}</span>
        <strong>{primaryMetricValue(activity, entry)}</strong>
      </div>
      <div className="leaderboard-podium-stats leaderboard-podium-stats-grid">
        <span>{secondaryMetricLabel(activity)}: {secondaryMetricValue(activity, entry)}</span>
        <span>{tertiaryMetricLabel(activity)}: {tertiaryMetricValue(activity, entry)}</span>
      </div>
    </article>
  )
}

const LeaderboardRow: React.FC<{ activity: ActivityFilter; entry: LeaderboardEntry }> = ({ activity, entry }) => {
  const location = formatLocation(entry.city, entry.state, entry.country)

  return (
    <article className="leaderboard-row">
      <span className="leaderboard-row-rank">#{entry.rank}</span>
      <div className="leaderboard-row-athlete">
        <span className="leaderboard-row-name">{entry.athlete_name}</span>
        {location && <span className="leaderboard-row-location">{location}</span>}
      </div>
      <span>{primaryMetricValue(activity, entry)}</span>
      <span>{entry.totals.count}</span>
      <span>{convertSecondsToTime(entry.totals.moving_time)}</span>
      <span>{secondaryMetricValue(activity, entry)}</span>
      <span>{tertiaryMetricValue(activity, entry)}</span>
    </article>
  )
}

const tableHeaders = (activity: ActivityFilter): string[] => {
  switch (activity) {
    case 'ride':
      return ['RANK', 'ATHLETE', 'KM', 'RIDES', 'TIME', 'FART', 'HM']
    case 'swim':
      return ['RANK', 'ATHLETE', 'METER', 'SWIMS', 'TIME', 'PACE', 'SESSIONER']
    default:
      return ['RANK', 'ATHLETE', 'KM', 'RUNS', 'TIME', 'PACE', 'HM']
  }
}

const primaryMetricLabel = (activity: ActivityFilter): string => {
  return activity === 'swim' ? 'DISTANSE' : 'DISTANSE'
}

const primaryMetricValue = (activity: ActivityFilter, entry: LeaderboardEntry): string => {
  return activity === 'swim'
    ? formatMeters(entry.totals.distance)
    : `${convertMetersToKm(entry.totals.distance)} km`
}

const secondaryMetricLabel = (activity: ActivityFilter): string => {
  switch (activity) {
    case 'ride':
      return 'FART'
    case 'swim':
      return 'PACE'
    default:
      return 'PACE'
  }
}

const secondaryMetricValue = (activity: ActivityFilter, entry: LeaderboardEntry): string => {
  switch (activity) {
    case 'ride':
      return `${entry.metrics.secondary_value.toFixed(1)} km/h`
    case 'swim':
      return formatPacePer100m(entry.metrics.secondary_value)
    default:
      return formatPacePerKm(entry.metrics.secondary_value)
  }
}

const tertiaryMetricLabel = (activity: ActivityFilter): string => {
  return activity === 'swim' ? 'SESSIONER' : 'HOYDEMETER'
}

const tertiaryMetricValue = (activity: ActivityFilter, entry: LeaderboardEntry): string => {
  return activity === 'swim'
    ? `${entry.totals.count}`
    : `${Math.round(entry.totals.elevation_gain)} m`
}

export default Leaderboard
