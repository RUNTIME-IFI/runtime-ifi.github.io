import React from 'react'

interface StravaLogoProps {
  title?: string
  ariaLabel?: string
  className?: string
}

const StravaLogo: React.FC<StravaLogoProps> = ({ title, ariaLabel, className = 'strava-logo-icon' }) => {
  const semanticProps = ariaLabel || title
    ? { role: 'img', 'aria-label': ariaLabel ?? undefined, 'aria-hidden': undefined as boolean | undefined }
    : { role: undefined, 'aria-label': undefined, 'aria-hidden': true }

  return (
    <svg {...semanticProps} viewBox="0 0 32 32" className={className}>
      {title && <title>{title}</title>}
      <path fill="currentColor" d="M14.4 2.5 8.2 15.2h4.3l1.9-4 1.9 4h4.3L14.4 2.5Z" />
      <path fill="currentColor" d="m20.5 15.2-2.7 5.5h3.2l1.1-2.2 1.1 2.2h3.2l-2.7-5.5h-3.2Z" />
      <path fill="currentColor" d="M10.9 17.9 5.6 28.5h5l2.6-5.3 2.6 5.3h5L15.5 17.9h-4.6Z" />
    </svg>
  )
}

export default StravaLogo
