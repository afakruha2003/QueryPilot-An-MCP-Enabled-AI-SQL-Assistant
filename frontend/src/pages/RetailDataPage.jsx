const columns = ['Invoice #', 'Transaction date', 'Product description', 'Units', 'Gross line amount', 'Territory', 'Status']

export default function RetailDataPage() {
  return <>
    <section className="dataset-strip">
      <span className="status-dot status-muted" />
      <div>
        <strong>Active configuration unavailable</strong>
        <small>
          Retail data browsing is disabled until a technical operator validates
          and activates a dataset.
        </small>
      </div>
      <span className="permission-pill">Permissions not verified</span>
    </section>

    <section className="panel data-panel">
      <div className="data-toolbar">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search invoice or product"
            placeholder="Search invoice or product…"
            disabled
          />
        </label>
        <select aria-label="Filter by status" disabled>
          <option>All statuses</option>
        </select>
        <select aria-label="Filter by country" disabled>
          <option>All permitted countries</option>
        </select>
        <button className="button button-secondary" disabled>
          Export tabular data (CSV)
        </button>
      </div>

      <div className="filter-chips">
        <span>View size</span>
        <button className="chip selected" disabled>50</button>
        <button className="chip" disabled>100</button>
        <button className="chip" disabled>250</button>
        <span className="muted">
          Results are permission-filtered and paginated.
        </span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={columns.length}>
                <div className="table-empty">
                  <span aria-hidden="true">▤</span>
                  <strong>No retail records to display</strong>
                  <p>
                    Connect an approved retail dataset to browse permitted
                    records. Unmapped or restricted fields will not be shown.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>0 records · Dataset not active</span>
        <div>
          <button className="button button-secondary" disabled>Previous</button>
          <span>Page —</span>
          <button className="button button-secondary" disabled>Next</button>
        </div>
      </div>
    </section>
  </>
}
