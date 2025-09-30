import React from 'react'
import { RuntimeTitle, StyledHeading } from '../components'

const Home: React.FC = () => {
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
        <p className="section-text">
          Her kommer en live-oppdatert tavle over aktiviteten til medlemmene våre.
        </p>
      </section>
    </>
  )
}

export default Home