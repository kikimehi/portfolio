import React from 'react'
import styles from './Hero.module.css'
import DynamicBackground from '../Background/DynamicBackground'
import avatarSrc from '../../assets/avatar.jpg'

export default function Hero({
  name = 'Mehimmedetsi Abdelkrim',
  role = 'Frontend developer',
  ctaText = 'Contact me',
  ctaHref = '#contact',
}) {
  const titleWords = ['Hi,', "I'm", ...name.split(' ')]

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <DynamicBackground />

      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            {titleWords.map((w, i) => (
              <span key={i} className={styles.word} style={{ animationDelay: `${600 + i * 120}ms` }}>{w}{i < titleWords.length - 1 ? ' ' : ''}</span>
            ))}
          </h1>
          <p className={styles.subtitle} style={{ animationDelay: '1200ms' }}>{role} — building modern web apps.</p>

          <div className={styles.actions}>
            <a className={styles.cta} href={ctaHref}>{ctaText}</a>
            <a className={styles.secondary} href="#projects">See projects</a>
          </div>
        </div>

        <div className={styles.avatar}>
          <img src={avatarSrc} alt={`Portrait of ${name}`} className={styles.avatarImg} />
        </div>
      </div>
    </section>
  )
}
