import React from 'react'
import NavLink from './NavLink'
import StyledHeading from './StyledHeading'

interface NavbarProps {
  onNavigate: (page: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    let attempts = 0
    const maxAttempts = 20

    const tryScroll = () => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      attempts += 1
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryScroll)
      }
    }

    requestAnimationFrame(tryScroll)
  }

  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(page)
  }

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate('home')
    scrollToSection(sectionId)
  }

  return (
    <header className="runtime-header">
    <StyledHeading level={2} className="section-title" onClick={handleNavClick('home')}>Runtime</StyledHeading>
      <nav className="runtime-nav">
        <NavLink href="#home" onClick={handleNavClick('home')}>
          HJEM
        </NavLink>
        <NavLink href="#about" onClick={handleNavClick('about')}>
          OM RUNTIME
        </NavLink>
        <NavLink href="#leaderboard" onClick={handleSectionClick('leaderboard')}>
          TAVLA
        </NavLink>
        <NavLink href="#strava" onClick={handleNavClick('strava')}>
          STRAVA
        </NavLink>
        <NavLink href="#contact" onClick={handleNavClick('contact')}>
          KONTAKT OSS
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
