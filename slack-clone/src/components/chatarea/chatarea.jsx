import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import './chatarea.css'

function ChatArea() {
  const { activeChannel } = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages.byChannel[activeChannel] || [])
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat">
      <div className="chat__welcome">
        <h3 className="chat__welcome-title"># {activeChannel}</h3>
        <p className="chat__welcome-desc">This is the beginning of the <strong>#{activeChannel}</strong> channel.</p>
      </div>

      {messages.length === 0 && (
        <p className="chat__empty">No messages yet. Say something! 👋</p>
      )}

      {messages.map((msg) => (
        <div key={msg.id} className="chat__message">
          <div className="chat__avatar">{msg.avatar}</div>
          <div className="chat__content">
            <div className="chat__meta">
              <span className="chat__username">{msg.user}</span>
              <span className="chat__time">{msg.time}</span>
            </div>
            <p className="chat__text">{msg.text}</p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatArea