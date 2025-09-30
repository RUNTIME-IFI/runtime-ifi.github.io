import React from 'react'

interface StyledHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const StyledHeading: React.FC<StyledHeadingProps> = ({ 
  level, 
  children, 
  className = '', 
  onClick 
}) => {
  const commonProps = {
    className: `styled-heading styled-heading-h${level} ${className}`,
    onClick
  }
  
  switch (level) {
    case 1:
      return <h1 {...commonProps}>{children}</h1>
    case 2:
      return <h2 {...commonProps}>{children}</h2>
    case 3:
      return <h3 {...commonProps}>{children}</h3>
    case 4:
      return <h4 {...commonProps}>{children}</h4>
    case 5:
      return <h5 {...commonProps}>{children}</h5>
    case 6:
      return <h6 {...commonProps}>{children}</h6>
    default:
      return <h1 {...commonProps}>{children}</h1>
  }
}

export default StyledHeading