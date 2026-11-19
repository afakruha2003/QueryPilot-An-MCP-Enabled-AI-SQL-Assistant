import { useState } from 'react'
import SiteFooter from '../components/SiteFooter.jsx'

export default function LoginPage({ onPreview, onSignIn, message, darkMode, onToggleTheme }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <main className="login-page">
      <header className="login-topbar">
        <a className="brand" href="#login">
          <span className="brand-mark">SQL</span>
          <span>
            <strong>Sql Assistant</strong>
            <small>Retail Intelligence System</small>
          </span>
        </a>
        <span className="connection-chip">
          <span className="status-dot status-muted" /> MCP Gateway: Preview
        </span>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          aria-pressed={darkMode}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            {darkMode ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </>
            ) : (
              <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
            )}
          </svg>
        </button>
      </header>

      <div className="login-center">
        <div className="session-notice">
          <span aria-hidden="true">◷</span>
          <div>
            <strong>Session expired</strong>
            <p>
              Your session ended after 30 minutes of inactivity to protect
              sensitive retail data. Please sign in again.
            </p>
          </div>
        </div>

        <section className="login-card">
          <p className="eyebrow">SECURE WORKSPACE</p>
          <h1>Sign in</h1>
          <p className="muted">
            Access your retail analytics dashboard and intelligent SQL
            assistant.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              onSignIn()
            }}
          >
            <label className="field-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Enter your username"
            />

            <label className="field-label" htmlFor="password">
              Password
            </label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button className="button button-primary sign-in-button" type="submit">
              ↪ &nbsp; Sign in
            </button>
          </form>

          {message && (
            <div className="form-message" role="status">
              {message}
            </div>
          )}

          <p className="login-footnote">
            Use your organization credentials. Passwords and recovery details
            are never shown in the preview.
          </p>
          <button className="preview-link" onClick={onPreview}>
            ◉ &nbsp; Enter UI preview
          </button>
          <p className="login-footnote centered">
            Preview mode does not authenticate or connect to a database.
          </p>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
