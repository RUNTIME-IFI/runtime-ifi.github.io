import React from 'react'
import runtimeBlack from './assets/runtime_black.png'
import runtimeWhite from './assets/runtime_white.png'
import './App.css'

// Interface for navigation link component
interface NavLinkProps {
  href: string
  children: React.ReactNode
}

// Interface for project card component
interface ProjectCardProps {
  title: string
  description: string
}

// Navigation Link Component
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a href={href} className="nav-link">
    {children}
  </a>
)

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => (
  <div className="project-card">
    <h3 className="project-title">{title}</h3>
    <p className="project-description">{description}</p>
  </div>
)

const App: React.FC = () => {
  return (
    <div className="runtime-app">
      {/* Header */}
      <header className="runtime-header">
        <img src={runtimeBlack} className="runtime-logo-header" alt="Runtime logo" />
        <nav className="runtime-nav">
          <NavLink href="#about">ABOUT</NavLink>
          <NavLink href="#projects">PROJECTS</NavLink>
          <NavLink href="#contact">CONTACT</NavLink>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="runtime-hero">
        <div className="hero-content">
          <img src={runtimeWhite} className="runtime-logo-hero" alt="Runtime" />
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
          <ProjectCard
            title="PROJECT ALPHA"
            description="INNOVATIVE SOLUTIONS FOR MODERN CHALLENGES"
          />
          <ProjectCard
            title="PROJECT BETA"
            description="PUSHING THE BOUNDARIES OF POSSIBILITY"
          />
          <ProjectCard
            title="PROJECT GAMMA"
            description="NEXT-GENERATION TECHNOLOGY STACK"
          />
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
