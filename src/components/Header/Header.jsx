import React from 'react'
import styles from './Header.module.css'
import SocialLinks from '../Shared/SocialLinks'

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <a href="#home" className={styles.brand}>Mehimmedetsi Abdelkrim</a>

        <nav aria-label="Primary" className={styles.nav}>
          <a className={styles.link} href="#projects">Projects</a>
          <a className={styles.link} href="#skills">Skills</a>
          <a className={styles.link} href="#contact">Contact</a>
        </nav>

        <div className={styles.socials}>
          {/* Use links from data/socials.js */}
          <SocialLinks />
        </div>
      </div>
    </header>
  )
}