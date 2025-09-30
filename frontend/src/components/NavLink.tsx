import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a href={href} className="nav-link" onClick={onClick}>
    {children}
  </a>
)

export default NavLink