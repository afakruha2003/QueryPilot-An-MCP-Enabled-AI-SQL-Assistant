import { useEffect, useState } from 'react'
import AppShell from './components/AppShell.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import RetailDataPage from './pages/RetailDataPage.jsx'
import AssistantPage from './pages/AssistantPage.jsx'
import AdminFormsPage from './pages/AdminFormsPage.jsx'
import EmployeeManagementPage from './pages/EmployeeManagementPage.jsx'
import AuditRecordsPage from './pages/AuditRecordsPage.jsx'

const pages = {
  Dashboard: DashboardPage,
  'Retail data': RetailDataPage,
  'AI assistant': AssistantPage,
  'Retail record forms': AdminFormsPage,
  'Employee management': EmployeeManagementPage,
  'Business audit records': AuditRecordsPage,
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem('querypilot-theme') === 'dark'
    } catch {
      return false
    }
  })
  const [authenticated, setAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [loginMessage, setLoginMessage] = useState('')
  const Page = pages[activePage]

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = darkMode ? 'dark' : 'light'
    root.classList.add('theme-changing')
    const transitionTimer = window.setTimeout(() => {
      root.classList.remove('theme-changing')
    }, 520)
    try {
      window.localStorage.setItem('querypilot-theme', darkMode ? 'dark' : 'light')
    } catch {
      // Theme still works for this session when storage is unavailable.
    }
    return () => window.clearTimeout(transitionTimer)
  }, [darkMode])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activePage, authenticated])

  if (!authenticated) {
    return (
      <LoginPage
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
        onPreview={() => {
          setLoginMessage('')
          setAuthenticated(true)
        }}
        message={loginMessage}
        onSignIn={() =>
          setLoginMessage(
            'Live sign-in is not connected yet. Use UI preview to explore the seven screens.',
          )
        }
      />
    )
  }

  return (
    <AppShell
      activePage={activePage}
      onNavigate={setActivePage}
      onSignOut={() => setAuthenticated(false)}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode((current) => !current)}
    >
      <Page
        onNavigate={setActivePage}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
      />
    </AppShell>
  )
}
