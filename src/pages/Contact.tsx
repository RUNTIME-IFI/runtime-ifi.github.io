import React from 'react'
import { VarslingButton } from '../components'

interface ContactProps {
  onNavigate: (page: string) => void
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="page-container">
      <div className="contact-page-wrapper">
        <VarslingButton onNavigate={onNavigate} />
        
        <section className="runtime-section contact">
          <h2 className="section-title">KONTAKT OSS</h2>
          <p className="section-text">
            Kontakt styret på runtimeifi@gmail.com.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Contact