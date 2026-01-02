import React from 'react'
import jsIcon from '../../assets/javascript.svg'
import pyIcon from '../../assets/python.svg'
import reactIcon from '../../assets/react.svg'
import gitIcon from '../../assets/git.svg'
import cssIcon from '../../assets/css.svg'
import githubIcon from '../../assets/github.svg'
import facebookIcon from '../../assets/facebook.svg'
import instagramIcon from '../../assets/instagram.svg'

const icons = {
  javascript: jsIcon,
  python: pyIcon,
  react: reactIcon,
  git: gitIcon,
  css: cssIcon,
  github: githubIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
}

export default function SkillIcon({ name, size = 18 }) {
  if (!name) return null

  const n = name.toLowerCase()
  const key = Object.keys(icons).find((k) => n.includes(k))
  const src = key ? icons[key] : null

  if (src) {
    return <img src={src} alt={`${name} logo`} width={size} height={size} />
  }

  const initials = name
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#E6E7EA" />
      <text x="50%" y="60%" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111">{initials}</text>
    </svg>
  )
}
