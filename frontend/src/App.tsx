import React, { useState } from 'react'
import './App.css'

// Components
import { Navbar, Footer } from './components'

// Pages
import { Home, About, Contact, Report } from './pages'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'contact':
        return <Contact onNavigate={handleNavigate} />
      case 'report':
        return <Report />
      default:
        return <Home />
    }
  }
  return (
    <div className="runtime-app">
      <Navbar onNavigate={handleNavigate} />
      {renderPage()}
      <Footer />
    </div>
  )
}

export default App
