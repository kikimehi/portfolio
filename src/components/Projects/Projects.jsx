import React from 'react'
import styles from './Projects.module.css'
import projects from '../../data/projects'

// Map normalized tech names to local SVG assets in src/assets
const techIcons = {
  jest: '/src/assets/jest.svg',
  javascript: '/src/assets/javascript.svg',
  react: '/src/assets/react.svg',
  vite: '/src/assets/vite.svg',
  html: '/src/assets/html5.svg',
  html5: '/src/assets/html5.svg',
  css: '/src/assets/css.svg',
  npm: '/src/assets/npm.svg',
  tailwindcss: '/src/assets/tailwindcss.svg',
  git: '/src/assets/git.svg',
  github: '/src/assets/github.svg',
  python: '/src/assets/python.svg',
}

export default function Projects() {
  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <h2 id="projects-title" className={styles.heading}>Project Showcase</h2>

      <ul className={styles.grid}>
        {projects.map((p) => (
          <li key={p.id} className={styles.card}>
            <a href={p.link} target="_blank" rel="noreferrer" className={styles.cardLink} aria-label={`Open ${p.title} repository (opens in new tab)`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{p.title}</h3>

                <div className={styles.icons}>
                  <span className={styles.icon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-1.99-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.4.96.11-.75.41-1.26.75-1.55-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.67.42.36.79 1.06.79 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
                    </svg>
                  </span>

                  <span className={styles.icon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </span>
                </div>
              </div>

              <p className={styles.cardDesc}>{p.description}</p>

              {p.tech && p.tech.length > 0 && (
                <div className={styles.techList} aria-label={`Technologies used: ${p.tech.join(', ')}`}>
                  {p.tech.map((t) => {
                    const key = t.toLowerCase().replace(/\s+/g, '')
                    const icon = techIcons[key]
                    return (
                      <span key={t} className={styles.techBadge}>
                        {icon && (
                          <img src={icon} alt={`${t} icon`} className={styles.techIcon} width="14" height="14" />
                        )}
                        <span>{t}</span>
                      </span>
                    )
                  })}
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
