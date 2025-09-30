import React from 'react'

interface RuntimeTitleProps {
  className?: string
  onClick?: () => void
}

const RuntimeTitle: React.FC<RuntimeTitleProps> = ({ className = '', onClick }) => {
  return (
    <div className={`runtime-title-container ${className}`} onClick={onClick}>
      <div className="runtime-title-line line-1">IT'S</div>
      <div className="runtime-title-line line-2">RUN</div>
      <div className="runtime-title-line line-3">TIME</div>
    </div>
  )
}

export default RuntimeTitle