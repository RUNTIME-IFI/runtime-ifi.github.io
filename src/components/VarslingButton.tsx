import React from 'react'

interface VarslingButtonProps {
  onNavigate: (page: string) => void
}

const VarslingButton: React.FC<VarslingButtonProps> = ({ onNavigate }) => {
  const handleReportClick = () => {
    onNavigate('report')
  }

  return (
    <span 
      className="varsling-span"
      onClick={handleReportClick}
      title="Klikk for å lese om varslingsrutiner"
    >
      VARSLING
    </span>
  )
}

export default VarslingButton