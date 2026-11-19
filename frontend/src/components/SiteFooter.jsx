const quickNavigation = [
  'Dashboard',
  'Data Management',
  'SQL Assistant',
  'Automation',
]

const resources = ['Documentation', 'Getting Started', 'API Reference']

function FooterLinkList({ title, items, className = '' }) {
  return (
    <section className={`footer-group ${className}`}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.08c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.7.08-.7 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.61 1.22 3.25.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.27-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.56.23 2.71.11 3 .73.79 1.16 1.8 1.16 3.03 0 4.3-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"
      />
    </svg>
  )
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <section className="footer-brand-block">
          <div className="footer-brand">
            <span className="footer-brand-mark">SQL</span>
            <span className="footer-brand-copy">
              <span className="footer-brand-title">
                Sql Assistant <span className="epoch-badge">Epoch N</span>
              </span>
              <span className="footer-brand-subtitle">
                Intelligent SQL &amp; Automation Platform
              </span>
            </span>
          </div>
          <p>
            An AI-powered platform that transforms natural language into
            intelligent database interactions and automated workflows through
            MCP integration.
          </p>
        </section>

        <FooterLinkList
          title="Quick Navigation"
          items={quickNavigation}
          className="footer-navigation"
        />
        <FooterLinkList
          title="Resources"
          items={resources}
          className="footer-resources"
        />

        <section className="footer-group footer-support">
          <h2>Support</h2>
          <span className="footer-connect-label">Connect</span>
          <a
            className="github-link"
            href="https://github.com/afakruha2003/QueryPilot-An-MCP-Enabled-AI-SQL-Assistant"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the QueryPilot GitHub repository"
            title="QueryPilot GitHub repository"
          >
            <GitHubIcon />
          </a>
        </section>
      </div>

      <div className="site-footer-bottom">
        <p>© 2026 SQL Assistant. All rights reserved.</p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
