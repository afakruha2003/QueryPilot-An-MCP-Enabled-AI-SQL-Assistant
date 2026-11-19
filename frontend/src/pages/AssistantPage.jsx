import { useEffect, useRef, useState } from 'react'

const quickQuestions = [
  {
    question: 'What were net sales last month?',
    description: 'Gross Sales minus Returns',
  },
  {
    question: 'Which products had the highest sales?',
    description: 'Top products by the approved sales metric',
  },
  {
    question: 'Show me sales by country.',
    description: 'Regional sales breakdown',
  },
  {
    question: 'How many orders were placed this period?',
    description: 'Counts distinct eligible sales invoices',
  },
]

export default function AssistantPage({ darkMode, onToggleTheme }) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const conversationRef = useRef(null)

  useEffect(() => {
    const conversation = conversationRef.current

    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight
    }
  }, [messages])

  const sendQuestion = (value) => {
    const text = value.trim()

    if (!text) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text },
      {
        role: 'assistant',
        text: 'I can’t query retail data in this preview. Connect authentication, an approved dataset, and the read-only MCP service to get an answer.',
      },
    ])
    setQuestion('')
  }

  const clearConversation = () => {
    setMessages([])
    setQuestion('')
  }

  const submitQuestion = (event) => {
    event.preventDefault()
    sendQuestion(question)
  }

  return (
    <div className="assistant-page">
      <div className="assistant-layout">
        <section className="assistant-workspace">
          <header className="assistant-toolbar">
            <div className="assistant-title-group">
              <span className="assistant-avatar" aria-hidden="true">
                ✳
              </span>
              <div>
                <h2>AI Assistant</h2>
                <p className="muted">
                  Ask questions about your approved retail data.
                </p>
              </div>
              <span className="assistant-ready-pill">
                <span className="status-dot" /> Preview mode
              </span>
            </div>

            <div className="toolbar-actions">
              <button
                className="theme-toggle"
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                aria-pressed={darkMode}
                title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  {darkMode ? (
                    <>
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                    </>
                  ) : (
                    <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
                  )}
                </svg>
              </button>
              <button
                className="button button-secondary clear-chat-button"
                onClick={clearConversation}
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" />
                </svg>
                <span className="action-label">Clear</span>
              </button>
              <button
                className="button button-secondary new-chat-button"
                onClick={clearConversation}
                aria-label="New chat"
                title="New chat"
              >
                <span className="action-label">New chat</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </header>

          <div
            className={`conversation ${messages.length ? 'has-messages' : ''}`}
            aria-live="polite"
            ref={conversationRef}
          >
            {messages.length === 0 ? (
              <div className="conversation-welcome">
                <span className="welcome-assistant-icon" aria-hidden="true">
                  ✳
                </span>
                <h3>How can I help you understand your retail data?</h3>
                <p>
                  Ask a question in plain language. I’ll use approved business
                  definitions and read-only access to find an answer.
                </p>
                <span className="conversation-boundary">
                  No SQL is shown · Conversations aren’t saved
                </span>
              </div>
            ) : (
              <div className="message-list">
                {messages.map((message, index) => (
                  <article
                    className={`chat-message ${message.role}`}
                    key={`${message.role}-${index}`}
                  >
                    {message.role === 'assistant' && (
                      <span className="message-avatar" aria-hidden="true">
                        ✳
                      </span>
                    )}
                    <div className="message-bubble">
                      <span className="message-author">
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <p>{message.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <form className="chat-composer" onSubmit={submitQuestion}>
            <label className="sr-only" htmlFor="assistant-question">
              Ask the AI assistant a question
            </label>
            <textarea
              id="assistant-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  sendQuestion(question)
                }
              }}
              placeholder="Ask about sales, orders, or products…"
              rows="2"
            />
            <div className="composer-footer">
              <span>
                Read-only analysis · SQL hidden · Shift + Enter for a new line
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

        <aside className="assistant-aside">
          <section className="panel quick-questions">
            <div className="quick-questions-heading">
              <div>
                <p className="eyebrow">SHORTCUTS</p>
                <h3>Quick Questions</h3>
              </div>
            </div>
            <p className="quick-questions-intro">
              Tap a pre-approved question to start a conversation.
            </p>
            <div className="quick-question-grid">
              {quickQuestions.map(({ question: prompt, description }) => (
                <button
                  key={prompt}
                  className="quick-question"
                  onClick={() => sendQuestion(prompt)}
                >
                  <span className="quick-question-copy">
                    <strong>{prompt}</strong>
                    <small>{description}</small>
                  </span>
                  <span className="quick-question-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="panel assistant-guardrails">
            <h3>Security &amp; MCP Guardrails</h3>
            <ul>
              <li>SQL queries stay hidden from business users.</li>
              <li>The assistant cannot edit or delete retail records.</li>
              <li>Conversation context is not stored permanently.</li>
            </ul>
          </section>
        </aside>
      </div>

      <div className="assistant-safety-note">
        <span aria-hidden="true">♧</span>
        <p>
          The assistant has read-only access. Questions and results stay in this
          temporary conversation and aren’t saved in preview mode.
        </p>
      </div>
    </div>
  )
}
