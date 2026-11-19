import { useState } from 'react'

const groups = [
  {
    label: 'Workspace',
    pages: ['Dashboard', 'Retail data', 'AI assistant'],
  },
  {
    label: 'Business admin',
    pages: [
      'Retail record forms',
      'Employee management',
      'Business audit records',
    ],
  },
]

const icons = {
  Dashboard: '▦',
  'Retail data': '▤',
  'AI assistant': '✳',
  'Retail record forms': '☷',
  'Employee management': '♙',
  'Business audit records': '◉',
}

const descriptions = {
  Dashboard:
    'Live business intelligence and sales transaction KPIs across approved PostgreSQL retail tables.',
  'Retail data': 'Explore permitted retail transactions and records.',
  'AI assistant': 'Ask questions about approved retail data in plain language.',
  'Retail record forms': 'Add or update records through approved business forms.',
  'Employee management': 'Provision employees, reset credentials, and manage access.',
  'Business audit records': 'Review authorized business changes and account actions.',
}

const pageTitles = {
  Dashboard: 'Retail Performance Dashboard',
  'Retail data': 'Retail Data Browsing',
  'AI assistant': 'AI Assistant',
  'Retail record forms': 'Retail Record Management',
  'Employee management': 'Employee Management',
  'Business audit records': 'Business Audit Records',
}

export default function AppShell({ activePage, onNavigate, onSignOut, children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [exportMessage, setExportMessage] = useState('')

  const navigateTo = (page) => {
    onNavigate(page)
    setMenuOpen(false)
    setExportMessage('')
  }

  return (
    <div className="app-shell">
      {menuOpen && (
        <button
          className="drawer-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
        <a
          className="brand"
          href="#dashboard"
          onClick={(event) => {
            event.preventDefault()
            navigateTo('Dashboard')
          }}
          aria-label="QueryPilot dashboard"
        >
          <span className="brand-mark">SQL</span>
          <span>
            <strong>Sql Assistant</strong>
            <small>Retail Intelligence</small>
          </span>
        </a>
        <button
          className="mobile-nav-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          ×
        </button>
        <nav className="main-nav" id="main-navigation" aria-label="Main navigation">
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p className="nav-caption">{group.label}</p>
              {group.pages.map((page) => (
                <button
                  className={`nav-item ${activePage === page ? 'active' : ''}`}
                  key={page}
                  onClick={() => navigateTo(page)}
                  aria-current={activePage === page ? 'page' : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {icons[page]}
                  </span>
                  <span>{page}</span>
                  {page === 'AI assistant' && (
                    <span className="mcp-badge">MCP</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="profile-card">
          <span className="avatar">P</span>
          <span>
            <strong>UI Preview</strong>
            <small>Not authenticated · no data access</small>
          </span>
          <button
            className="sign-out"
            onClick={onSignOut}
            aria-label="Return to sign-in page"
          >
            ↪
          </button>
        </div>
        <div className="mapping-status">
          <span className="status-dot" /> No active retail mapping
        </div>
      </aside>
      <main
        className={`main-content ${activePage === 'AI assistant' ? 'assistant-mode' : ''} ${activePage === 'Dashboard' ? 'dashboard-mode' : ''}`}
      >
        <div className="mobile-app-bar">
          <a
            className="brand"
            href="#dashboard"
            onClick={(event) => {
              event.preventDefault()
              navigateTo('Dashboard')
            }}
            aria-label="QueryPilot dashboard"
          >
            <span className="brand-mark">SQL</span>
            <span>
              <strong>Sql Assistant</strong>
              <small>Retail Intelligence</small>
            </span>
          </a>
          <button
            className="mobile-nav-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <header className="page-header">
          <div>
            <p className="eyebrow">QUERY PILOT / {activePage.toUpperCase()}</p>
            <h1>{pageTitles[activePage]}</h1>
            <p className="muted">{descriptions[activePage]}</p>
          </div>
          <div className="header-actions">
            {activePage === 'Dashboard' && (
              <>
                <button
                  className="button button-secondary"
                  onClick={() => navigateTo('AI assistant')}
                >
                  ▤ &nbsp; Ask AI Assistant
                </button>
                <button
                  className="button button-primary"
                  onClick={() =>
                    setExportMessage(
                      'PDF export is not connected in UI preview mode.',
                    )
                  }
                >
                  ▣ &nbsp; Export Report (PDF)
                </button>
              </>
            )}
          </div>
        </header>
        {exportMessage && (
          <div className="export-preview-message" role="status">
            {exportMessage}
          </div>
        )}
        {children}
        <footer className="page-footer">
          <span>QueryPilot · Retail intelligence</span>
          <span>Sample UI only · no live data</span>
        </footer>
      </main>
    </div>
  )
}

