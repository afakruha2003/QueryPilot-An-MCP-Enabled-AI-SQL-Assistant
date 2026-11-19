import { useState } from 'react'

export default function EmployeeManagementPage() {
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  const toggleForm = () => {
    setShowForm(!showForm)
    setMessage('')
  }

  const submitEmployee = (event) => {
    event.preventDefault()
    setMessage('Employee accounts cannot be created in preview mode.')
  }

  return (
    <section className="panel management-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ACCESS ADMINISTRATION</p>
          <h2>Employee management</h2>
          <p className="muted">
            Provision employees, reset passwords, and revoke accounts.
          </p>
        </div>
        <button className="button button-primary" onClick={toggleForm}>
          ＋ Add employee
        </button>
      </div>

      <div className="role-notice">
        <span aria-hidden="true">ⓘ</span>
        <div>
          <strong>Standard role: Employee</strong>
          <p>
            Employees have read-only access to permitted retail data,
            dashboards, and AI. Admin access is not assigned from this screen.
          </p>
        </div>
      </div>

      {showForm && (
        <form className="inline-create-form" onSubmit={submitEmployee}>
          <div className="form-heading">
            <div>
              <h3>Create employee account</h3>
              <p className="muted">
                A real account requires an authenticated Business Admin and
                backend session controls.
              </p>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
            >
              ×
            </button>
          </div>

          <div className="field-grid">
            <label>
              <span className="field-label">Full name</span>
              <input placeholder="Employee name" />
            </label>
            <label>
              <span className="field-label">Username</span>
              <input placeholder="Unique username" />
            </label>
            <label>
              <span className="field-label">Initial password</span>
              <input type="password" placeholder="Temporary password" />
            </label>
            <label>
              <span className="field-label">Recovery email</span>
              <input type="email" placeholder="name@example.com" />
            </label>
          </div>

          <div className="form-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className="button button-primary" type="submit">
              Create employee
            </button>
          </div>
        </form>
      )}

      {message && (
        <div className="form-message" role="status">
          {message}
        </div>
      )}

      <div className="data-toolbar employee-toolbar">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search employees"
            placeholder="Search by name or username…"
          />
        </label>
        <select aria-label="Filter employee status">
          <option>All account statuses</option>
          <option>Active</option>
          <option>Pending change</option>
          <option>Disabled</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Username</th>
              <th>Role</th>
              <th>Account status</th>
              <th>Last sign-in</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6">
                <div className="table-empty compact">
                  <span aria-hidden="true">♙</span>
                  <strong>
                    {query
                      ? 'No matching employees'
                      : 'No employee accounts to display'}
                  </strong>
                  <p>Employee account data is unavailable in preview mode.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>0 employee accounts</span>
        <span>Employee passwords and recovery secrets are never displayed.</span>
      </div>
    </section>
  )
}
