import React, { useEffect } from 'react'
import { RuntimeTitle, StyledHeading } from '../components'
import { getOAuthStatus } from '../api/stravaApi'
import { Leaderboard } from './Leaderboard'

const Home: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shouldFocusLeaderboard = params.get('page') === 'leaderboard' || getOAuthStatus().status !== null

    if (!shouldFocusLeaderboard) {
      return
    }

    requestAnimationFrame(() => {
      document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (params.get('page') === 'leaderboard') {
        params.delete('page')
        const url = new URL(window.location.href)
        url.search = params.toString()
        window.history.replaceState({}, '', url.toString())
      }
    })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="runtime-hero">
        <div className="hero-content">
          <RuntimeTitle className="hero-title" />
          <p className="hero-subtitle">
            Løpegruppen for deg som går på IFI.
          </p>
        </div>
        <div className="hero-visual">
          <div className="runtime-shadow-effect"></div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="runtime-section projects">
        <StyledHeading level={2} className="section-title">TAVLA</StyledHeading>
        <Leaderboard />
      </section>
    </>
  )
}

export default Home
