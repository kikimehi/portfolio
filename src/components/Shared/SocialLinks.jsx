import React from 'react'
import styles from './SocialLinks.module.css'
import socials from '../../data/socials'
import githubIcon from '../../assets/github.svg'
import facebookIcon from '../../assets/facebook.svg'
import instagramIcon from '../../assets/instagram.svg'

export default function SocialLinks({ size = 20, className = '' }) {
  return (
    <div className={className} style={{ display: 'flex', gap: 10 }}>
      {socials.github && (
        <a className={`${styles.iconBtn} ${styles.github}`} href={socials.github} rel="noreferrer" target="_blank" aria-label="View on GitHub">
          <img src={githubIcon} alt="GitHub" width={size} height={size} />
        </a>
      )}
      {socials.facebook && (
        <a className={`${styles.iconBtn} ${styles.facebook}`} href={socials.facebook} rel="noreferrer" target="_blank" aria-label="Facebook">
          <img src={facebookIcon} alt="Facebook" width={size} height={size} />
        </a>
      )}
      {socials.instagram && (
        <a className={`${styles.iconBtn} ${styles.instagram}`} href={socials.instagram} rel="noreferrer" target="_blank" aria-label="Instagram">
          <img src={instagramIcon} alt="Instagram" width={size} height={size} />
        </a>
      )}
    </div>
  )
}
