import { useState } from 'react'

export default function LoginPage({ onPreview, onSignIn, message }) {
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

      <footer className="login-footer">
        Sql Assistant · Epoch N Retail Analytics Platform
      </footer>
    </main>
  )
}
