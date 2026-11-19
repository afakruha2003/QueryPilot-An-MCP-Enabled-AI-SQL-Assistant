const auditColumns = [
  'Timestamp (UTC)',
  'Actor',
  'Action type',
  'Target record',
  'Permitted old values',
  'Permitted new values',
]

export default function AuditRecordsPage() {
  return (
    <>
      <section className="notice">
        <span className="notice-dot" />
        <div>
          <strong>Business Admin access only</strong>
          <p>
            Audit events show permitted business changes. Passwords, tokens,
            excluded sensitive fields, and technical AI logs are not shown
            here.
          </p>
        </div>
        <span className="permission-pill">Admin view</span>
      </section>

      <section className="panel audit-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GOVERNANCE</p>
            <h2>Business audit records</h2>
            <p className="muted">
              Authorized actions, account events, and approved field changes.
            </p>
          </div>
          <button className="button button-secondary" disabled>
            Export audit log
          </button>
        </div>

        <div className="audit-filters">
          <span className="filter-title">☷ &nbsp; FILTER BY</span>
          <select aria-label="Filter by action">
            <option>All business actions</option>
            <option>Record changes</option>
            <option>Account actions</option>
          </select>
          <select aria-label="Filter by actor">
            <option>All authorized actors</option>
          </select>
          <div className="view-switch">
            <span>View state</span>
            <button className="selected" disabled>Records</button>
            <button disabled>Empty</button>
            <button disabled>Loading</button>
            <button disabled>Error</button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {auditColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={auditColumns.length}>
                  <div className="table-empty">
                    <span aria-hidden="true">◉</span>
                    <strong>No audit events available</strong>
                    <p>
                      Events appear here after authorized changes have been
                      recorded by the backend.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>0 verified audit events · Page —</span>
          <div>
            <button className="button button-secondary" disabled>
              Previous
            </button>
            <button className="button button-secondary" disabled>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
