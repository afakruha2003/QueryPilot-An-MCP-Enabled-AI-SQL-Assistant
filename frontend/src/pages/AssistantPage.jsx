import { useEffect, useRef, useState } from 'react'

const quickQuestions = [
  'What were net sales last month?',
  'Which products had the highest gross sales?',
  'Show sales by country for the last quarter.',
  'How many distinct orders were returned?',
]

export default function AssistantPage() {
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
    <main className="assistant-page">
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
              className="button button-secondary"
              onClick={clearConversation}
            >
              Clear
            </button>
            <button
              className="button button-secondary"
              onClick={clearConversation}
            >
              ＋ New chat
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
            <span>Read-only analysis · SQL hidden · Shift + Enter for a new line</span>
            <button
              className="button button-primary"
              type="submit"
              disabled={!question.trim()}
            >
              Send &nbsp; ↗
            </button>
          </div>
        </form>

        <section className="quick-questions">
          <div className="quick-questions-heading">
            <div>
              <p className="eyebrow">GET STARTED</p>
              <h3>Quick questions</h3>
            </div>
            <span className="muted">Choose a prompt to start chatting</span>
          </div>
          <div className="quick-question-grid">
            {quickQuestions.map((item) => (
              <button
                key={item}
                className="quick-question"
                onClick={() => sendQuestion(item)}
              >
                <span>{item}</span>
                <span className="quick-question-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
        </section>
      </section>

      <div className="assistant-safety-note">
        <span aria-hidden="true">♧</span>
        <p>
          The assistant has read-only access. Questions and results stay in this
          temporary conversation and aren’t saved in preview mode.
        </p>
      </div>
    </main>
  )
}
