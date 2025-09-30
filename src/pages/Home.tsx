import React from 'react'

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="runtime-hero">
        <div className="hero-content">
          <h1 className="hero-title">RUNTIME</h1>
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
        <h2 className="section-title">TAVLA</h2>
        <p className="section-text">
          Her kommer en live-oppdatert tavle over aktiviteten til medlemmene våre.
        </p>
      </section>
    </>
  )
}

export default Home