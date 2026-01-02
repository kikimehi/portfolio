import React from 'react'
import styles from './SocialLinks.module.css'
import socials from '../../data/socials'

export default function SocialLinks({ size = 20, className = '' }) {
  return (
    <div className={className} style={{ display: 'flex', gap: 10 }}>
      {socials.github && (
        <a className={`${styles.iconBtn} ${styles.github}`} href={socials.github} rel="noreferrer" target="_blank" aria-label="View on GitHub">
          <img src="/src/assets/github.svg" alt="GitHub" width={size} height={size} />
        </a>
      )}
      {socials.facebook && (
        <a className={`${styles.iconBtn} ${styles.facebook}`} href={socials.facebook} rel="noreferrer" target="_blank" aria-label="Facebook">
          <img src="/src/assets/facebook.svg" alt="Facebook" width={size} height={size} />
        </a>
      )}
      {socials.instagram && (
        <a className={`${styles.iconBtn} ${styles.instagram}`} href={socials.instagram} rel="noreferrer" target="_blank" aria-label="Instagram">
          <img src="/src/assets/instagram.svg" alt="Instagram" width={size} height={size} />
        </a>
      )}
    </div>
  )
}
