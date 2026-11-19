const metrics = [
  ['Gross sales', 'Eligible sale-line totals'],
  ['Returns', 'Positive return magnitude'],
  ['Net sales', 'Gross sales − returns'],
  ['Total orders', 'Distinct eligible sales invoices'],
  ['Average order value', 'Gross sales ÷ total orders'],
]

export default function DashboardPage() {
  return <>
    <section className="filter-bar">
      <span className="filter-title">☷ &nbsp; FILTERS</span>
      <button className="select-like" disabled>
        Date range · unavailable
      </button>
      <button className="select-like" disabled>
        All permitted countries
      </button>
      <button className="select-like" disabled>
        All products
      </button>
      <button className="text-button" disabled>Reset filters</button>
      <div className="mapping-label">
        ▤ &nbsp; Active schema mapping: <strong>Not configured</strong>
      </div>
    </section>

    <div className="section-heading">
      <div>
        <h2>Key performance indicators</h2>
        <p className="muted">
          Metrics appear after an approved retail mapping is activated.
        </p>
      </div>
      <span className="timestamp">No active dataset</span>
    </div>

    <section className="metric-grid" aria-label="Key performance indicators">
      {metrics.map(([name, note]) => (
        <article className="metric-card" key={name}>
          <p className="metric-label">{name}</p>
          <p className="metric-value unavailable">Unavailable</p>
          <p className="metric-foot">{note}</p>
        </article>
      ))}
    </section>

    <section className="notice">
      <span className="notice-dot" />
      <div>
        <strong>Data integrity notice</strong>
        <p>
          If returns, currency rules, or required relationships are absent,
          dependent metrics will show unavailable instead of assuming zero or
          inventing a value.
        </p>
      </div>
    </section>

    <section className="dashboard-grid">
      <article className="panel">
        <div className="panel-heading">
          <div>
            <h3>Monthly sales trends</h3>
            <p className="muted">Gross sales and returns by calendar period</p>
          </div>
          <span className="panel-tag">Awaiting data</span>
        </div>
        <div className="chart-placeholder">
          <span aria-hidden="true">⌁</span>
          <p>Trend chart will display when mapped sales data is available.</p>
          <div className="chart-gridlines" />
        </div>
      </article>

      <article className="panel">
        <div className="panel-heading">
          <div>
            <h3>Sales by country</h3>
            <p className="muted">Regional revenue contribution</p>
          </div>
        </div>
        <div className="empty-state">
          <span aria-hidden="true">◎</span>
          <p>Country mapping is not configured.</p>
        </div>
      </article>
    </section>

    <article className="panel products-panel">
      <div className="panel-heading">
        <div>
          <h3>Top-selling products</h3>
          <p className="muted">
            Product ranking follows the approved mapping rule
          </p>
        </div>
      </div>
      <div className="empty-row">
        Product results will appear when an active mapping supports this view.
      </div>
    </article>
  </>
}
