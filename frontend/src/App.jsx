import { useState } from 'react'
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
  const [authenticated, setAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [loginMessage, setLoginMessage] = useState('')
  const Page = pages[activePage]

  if (!authenticated) {
    return (
      <LoginPage
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
    >
      <Page onNavigate={setActivePage} />
    </AppShell>
  )
}
