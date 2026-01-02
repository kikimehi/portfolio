import React from 'react'
import styles from './Skills.module.css'
import skills from '../../data/skills'
import SkillIcon from './SkillIcon'

export default function Skills() {
  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <h2 id="skills-title" className={styles.heading}>Skills</h2>

      <div className={styles.grid}>
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>
            <span className={styles.groupIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M16 7l-8 10"/><path d="M8 7h8v10"/></svg>
            </span>
            Languages
          </h3>
          <ul className={styles.list}>
            {skills.languages.map((s) => (
              <li key={s} className={styles.chip}>
                <span className={styles.chipIcon} aria-hidden="true"><SkillIcon name={s} /></span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>
            <span className={styles.groupIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
            </span>
            Frameworks & Libraries
          </h3>
          <ul className={styles.list}>
            {skills.frameworks.map((s) => (
              <li key={s} className={styles.chip}>
                <span className={styles.chipIcon} aria-hidden="true"><SkillIcon name={s} /></span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>
            <span className={styles.groupIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7"/></svg>
            </span>
            Testing
          </h3>
          <ul className={styles.list}>
            {skills.testing.map((s) => (
              <li key={s} className={styles.chip}>
                <span className={styles.chipIcon} aria-hidden="true"><SkillIcon name={s} /></span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>
            <span className={styles.groupIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v4"/><path d="M6.4 6.4L8.5 8.5"/><path d="M2 12h4"/><path d="M16 15.5l2.1 2.1"/><path d="M22 12h-4"/></svg>
            </span>
            Tooling & DevOps
          </h3>
          <ul className={styles.list}>
            {skills.tooling.concat(skills.devops).map((s) => (
              <li key={s} className={styles.chip}>
                <span className={styles.chipIcon} aria-hidden="true"><SkillIcon name={s} /></span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
