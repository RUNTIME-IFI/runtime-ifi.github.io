import React from 'react'
import runtimeWhite from '../assets/runtime_white.png'

const Footer: React.FC = () => {
  return (
    <footer className="runtime-footer">
      <img src={runtimeWhite} className="runtime-logo-footer" alt="Runtime" />
      <p className="footer-text">© 2025 RUNTIME. ALL RIGHTS RESERVED.</p>
    </footer>
  )
}

export default Footer