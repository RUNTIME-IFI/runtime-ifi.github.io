import React, { useEffect, useState } from 'react'
import './App.css'

// Components
import { Navbar, Footer } from './components'

// Pages
import { Home, About, Contact, Report, Strava } from './pages'

const getInitialPage = (): string => {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')

  switch (page) {
    case 'about':
    case 'contact':
    case 'report':
    case 'strava':
      return page
    default:
      return 'home'
  }
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>(getInitialPage)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    const nextUrl = new URL(window.location.href)

    if (page === 'home') {
      nextUrl.searchParams.delete('page')
    } else {
      nextUrl.searchParams.set('page', page)
    }

    window.history.pushState({}, '', nextUrl.toString())
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
      case 'strava':
        return <Strava />
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
