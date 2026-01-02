import React, { useState } from 'react'
import styles from './Contact.module.css'
import SocialLinks from '../Shared/SocialLinks'
import socials from '../../data/socials'

// This component posts form data to the endpoint set in Vite env var:
// VITE_FORMSPREE_ENDPOINT (e.g. https://formspree.io/f/yourFormId)
// To enable direct delivery to your email:
// 1) Create a free Formspree form at https://formspree.io and connect your email.
// 2) Copy the endpoint and set it in `.env` or `.env.local`: VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxx
// 3) Restart dev server so Vite picks up the env var.

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error | no-endpoint

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  function validate() {
    if (!values.name || !values.email || !values.message) return false
    // basic email check
    return /\S+@\S+\.\S+/.test(values.email)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) { setStatus('error'); return }

    // If no endpoint is configured, open user's mail client with pre-filled content
    if (!ENDPOINT) {
      setStatus('sending')
      try {
        const subject = values.subject || 'Contact from portfolio'
        const body = `${values.message}\n\n--\n${values.name} <${values.email}>`
        const mailto = `mailto:${encodeURIComponent(socials.email || 'mehimmedetsiabdelkrim@gmail.com')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        // open mail client
        window.location.href = mailto
        setStatus('success')
      } catch (err) {
        setStatus('error')
      }
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        setStatus('success')
        setValues({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <h2 id="contact-title" className={styles.heading}>Contact</h2>

      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <svg className={styles.contactIcon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
          <a className={styles.contactLink} href={`mailto:${socials.email}`}>{socials.email}</a>
        </div>

        <div className={styles.contactItem}>
          <img src="/src/assets/linkedin-svgrepo-com.svg" alt="LinkedIn" className={styles.contactIcon} />
          <a className={styles.contactLink} href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <SocialLinks />
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <label className={styles.label}>
            Name
            <input name="name" value={values.name} onChange={handleChange} className={styles.input} required />
          </label>

          <label className={styles.label}>
            Email
            <input name="email" type="email" value={values.email} onChange={handleChange} className={styles.input} required />
          </label>
        </div>

        <label className={styles.label}>
          Subject
          <input name="subject" value={values.subject} onChange={handleChange} className={styles.input} />
        </label>

        <label className={styles.label}>
          Message
          <textarea name="message" value={values.message} onChange={handleChange} className={styles.textarea} required />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.button} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <div aria-live="polite" className={styles.message}>
            {status === 'success' && <span className={styles.success}>Message sent — I will reply soon.</span>}
            {status === 'error' && <span className={styles.error}>Failed to send. Please check the form and try again.</span>}
            {status === 'no-endpoint' && (
              <span className={styles.error}>
                Form endpoint not configured. Set <code>VITE_FORMSPREE_ENDPOINT</code> in your `.env` (see comments in this file).
              </span>
            )}
          </div>
        </div>

        <p className={styles.note}>If you prefer, you can also email me directly at <a href={`mailto:${socials.email}`}>{socials.email}</a>.</p>

        <div className={styles.socials} aria-label="Social links">
          <SocialLinks size={26} />
        </div>
      </form>
    </section>
  )
}
