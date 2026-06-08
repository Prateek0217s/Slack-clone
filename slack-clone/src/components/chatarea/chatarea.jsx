import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import './chatarea.css'

function ChatArea() {
  const { activeChannel } = useSelector((state) => state.channels)
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    const q = query(
      collection(db, 'channels', activeChannel, 'messages'),
      orderBy('timestamp', 'asc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMessages(msgs)
    })
    return () => unsubscribe()
  }, [activeChannel])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat">
      <div className="chat__welcome">
        <h3 className="chat__welcome-title"># {activeChannel}</h3>
        <p className="chat__welcome-desc">Beginning of <strong>#{activeChannel}</strong></p>
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