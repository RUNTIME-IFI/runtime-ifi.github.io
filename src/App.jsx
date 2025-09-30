import runtimeBlack from './assets/runtime_black.png'
import runtimeSvar from './assets/runtime_svar.png'
import './App.css'

function App() {
  return (
    <div className="runtime-app">
      {/* Header */}
      <header className="runtime-header">
        <img src={runtimeBlack} className="runtime-logo-header" alt="Runtime logo" />
        <nav className="runtime-nav">
          <a href="#about" className="nav-link">ABOUT</a>
          <a href="#projects" className="nav-link">PROJECTS</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="runtime-hero">
        <div className="hero-content">
          <img src={runtimeSvar} className="runtime-logo-hero" alt="Runtime" />
          <h1 className="hero-title">RUNTIME</h1>
          <p className="hero-subtitle">
            FAST. DYNAMIC. INNOVATIVE.
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary">GET STARTED</button>
            <button className="cta-button secondary">LEARN MORE</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="runtime-shadow-effect"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="runtime-section">
        <h2 className="section-title">ABOUT RUNTIME</h2>
        <p className="section-text">
          RUNTIME REPRESENTS SPEED, EFFICIENCY, AND INNOVATION IN MOTION.
          WE BUILD SOLUTIONS THAT MOVE AT THE SPEED OF THOUGHT.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="runtime-section projects">
        <h2 className="section-title">PROJECTS</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3 className="project-title">PROJECT ALPHA</h3>
            <p className="project-description">INNOVATIVE SOLUTIONS FOR MODERN CHALLENGES</p>
          </div>
          <div className="project-card">
            <h3 className="project-title">PROJECT BETA</h3>
            <p className="project-description">PUSHING THE BOUNDARIES OF POSSIBILITY</p>
          </div>
          <div className="project-card">
            <h3 className="project-title">PROJECT GAMMA</h3>
            <p className="project-description">NEXT-GENERATION TECHNOLOGY STACK</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="runtime-section contact">
        <h2 className="section-title">CONTACT</h2>
        <p className="section-text">
          READY TO ACCELERATE YOUR RUNTIME? GET IN TOUCH.
        </p>
        <button className="cta-button primary">CONTACT US</button>
      </section>

      {/* Footer */}
      <footer className="runtime-footer">
        <img src={runtimeBlack} className="runtime-logo-footer" alt="Runtime" />
        <p className="footer-text">© 2025 RUNTIME. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}

export default App
