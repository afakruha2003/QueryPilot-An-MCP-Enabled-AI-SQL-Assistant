import { useState } from 'react'

const formTabs = ['Form', 'Validation', 'Conflict', 'History']

const tabContent = {
  Validation: {
    title: 'Validation preview',
    description:
      'Required fields, allowed values, data types, and relationship checks are defined by approved form configuration and enforced by the backend.',
  },
  Conflict: {
    title: 'Stale edit protection',
    description:
      'Updates will be rejected or routed through an explicit conflict flow if the record has changed since it was opened.',
  },
  History: {
    title: 'Change history',
    description:
      'Successful changes create business audit events. No record history is available in preview mode.',
  },
}

export default function AdminFormsPage() {
  const [tab, setTab] = useState('Form')
  const [notice, setNotice] = useState('')

  const submitForm = (event) => {
    event.preventDefault()
    setNotice('Cannot save: no approved form configuration is active.')
  }

  return (
    <>
      <section className="notice config-notice">
        <span className="notice-dot" />
        <div>
          <strong>Approved configuration required</strong>
          <p>
            Record forms are generated from the technical team's allowlist.
            Historical sales values, unauthorized fields, and record deletions
            remain protected.
          </p>
        </div>
      </section>

      <section className="panel form-page-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RETAIL RECORD MANAGEMENT</p>
            <h2>Approved record forms</h2>
            <p className="muted">Add or update only configured fields.</p>
          </div>
          <span className="permission-pill">Admin workflow · preview only</span>
        </div>

        <div className="form-tabs" role="tablist" aria-label="Form states">
          {formTabs.map((item) => (
            <button
              role="tab"
              aria-selected={tab === item}
              className={tab === item ? 'active' : ''}
              key={item}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === 'Form' && (
          <form className="record-form" onSubmit={submitForm}>
            <div className="form-heading">
              <div>
                <h3>Select an approved form</h3>
                <p className="muted">
                  Available record types and fields come from the active
                  technical configuration.
                </p>
              </div>
              <span className="empty-form-icon">☷</span>
            </div>

            <label className="field-label" htmlFor="record-type">
              Record type
            </label>
            <select id="record-type" disabled>
              <option>No approved record types available</option>
            </select>

            <div className="form-placeholder">
              <span aria-hidden="true">▤</span>
              <strong>Form fields are not configured</strong>
              <p>
                When a validated mapping is active, this area will show
                approved labels, types, relationships, and validation rules
                for add or edit actions.
              </p>
            </div>

            <div className="form-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setNotice('No changes to discard.')}
              >
                Cancel
              </button>
              <button
                className="button button-primary"
                type="submit"
                disabled
              >
                Save record changes
              </button>
            </div>
          </form>
        )}

        {tab !== 'Form' && (
          <div className="tab-empty">
            <strong>{tabContent[tab].title}</strong>
            <p>{tabContent[tab].description}</p>
          </div>
        )}

        {notice && (
          <div className="form-message" role="status">
            {notice}
          </div>
        )}
      </section>
    </>
  )
}
