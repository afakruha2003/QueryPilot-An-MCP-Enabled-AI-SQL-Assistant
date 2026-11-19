import { useState } from 'react'

const quickQuestions = [
  'What were net sales last month?',
  'Which products had the highest gross sales?',
  'Show sales by country for the last quarter.',
  'How many distinct orders were returned?',
]

export default function AssistantPage() {
  const [question, setQuestion] = useState('')
  const [notice, setNotice] = useState('')

  const ask = (value) => {
    setQuestion(value)
    setNotice(
      'Assistant execution is unavailable until authentication, an approved dataset, and the read-only MCP service are connected.',
    )
  }

  const clearConversation = () => {
    setQuestion('')
    setNotice('Conversation cleared. Chat history is not stored.')
  }

  const startNewConversation = () => {
    setQuestion('')
    setNotice('New conversation started.')
  }

  const submitQuestion = (event) => {
    event.preventDefault()

    if (question.trim()) {
      ask(question.trim())
    }
  }

  return (
    <div className="assistant-layout">
      <section className="panel assistant-chat">
        <div className="assistant-toolbar">
          <div>
            <h2>Ask your retail data</h2>
            <p className="muted">Multilingual questions · read-only analysis</p>
          </div>
          <div className="toolbar-actions">
            <button className="button button-secondary" onClick={clearConversation}>
              Clear chat
            </button>
            <button
              className="button button-secondary"
              onClick={startNewConversation}
            >
              ＋ New chat
            </button>
          </div>
        </div>

        <div className="chat-empty">
          <span className="assistant-avatar">✳</span>
          <h3>What would you like to understand?</h3>
          <p>
            Your question will be checked against approved retail definitions
            and relationships. SQL is never shown to business users.
          </p>
          <span className="empty-chat-tag">
            No conversation history is stored
          </span>
        </div>

        <div className="quick-questions">
          <div className="panel-heading">
            <h3>Quick questions</h3>
            <span className="muted">Try a suggestion</span>
          </div>
          {quickQuestions.map((item) => (
            <button
              key={item}
              className="quick-question"
              onClick={() => ask(item)}
            >
              {item}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        {notice && (
          <div className="form-message" role="status">
            {notice}
          </div>
        )}

        <form className="chat-composer" onSubmit={submitQuestion}>
          <label className="sr-only" htmlFor="assistant-question">
            Ask a question about retail data
          </label>
          <textarea
            id="assistant-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question about your retail sales, orders, or products…"
            rows="2"
          />
          <div className="composer-footer">
            <span>
              English and multilingual questions supported by the configured
              model.
            </span>
            <button
              className="button button-primary"
              type="submit"
              disabled={!question.trim()}
            >
              Send &nbsp; ↗
            </button>
          </div>
        </form>
      </section>

      <aside className="assistant-side">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Request status</h3>
              <p className="muted">Processing stages</p>
            </div>
            <span className="status-pill status-idle">Idle</span>
          </div>
          <ol className="stage-list">
            <li>
              <span>1</span>
              <div>
                <strong>Validate access</strong>
                <small>Waiting for sign-in</small>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Resolve meaning</strong>
                <small>Requires active mapping</small>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Run safe query</strong>
                <small>Read-only MCP unavailable</small>
              </div>
            </li>
            <li>
              <span>4</span>
              <div>
                <strong>Present results</strong>
                <small>No results returned</small>
              </div>
            </li>
          </ol>
          <button className="button button-secondary cancel-button" disabled>
            Cancel request
          </button>
        </section>

        <section className="panel safety-panel">
          <h3>Safe and transparent answers</h3>
          <ul>
            <li>Ambiguous questions prompt for clarification.</li>
            <li>Unsupported data is reported as unavailable.</li>
            <li>Queries run with read-only permissions and limits.</li>
            <li>New Chat and Clear Chat reset conversation context.</li>
          </ul>
        </section>
      </aside>
    </div>
  )
}
