import React from 'react'
import NavLink from './NavLink'
import StyledHeading from './StyledHeading'

interface NavbarProps {
  onNavigate: (page: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(page)
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
        <NavLink href="#contact" onClick={handleNavClick('contact')}>
          KONTAKT OSS
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar