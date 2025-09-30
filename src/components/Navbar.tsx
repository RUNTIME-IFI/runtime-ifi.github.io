import React from 'react'
import runtimeBlack from '../assets/runtime_black.png'

// Interface for navigation link component
interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

// Navigation Link Component
const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a href={href} className="nav-link" onClick={onClick}>
    {children}
  </a>
)

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
    <h2 className="section-title">Runtime</h2>
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