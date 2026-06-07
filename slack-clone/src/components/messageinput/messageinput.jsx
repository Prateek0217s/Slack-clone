import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../features/messages/message'
import './message.css'

function MessageInput() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { activeChannel } = useSelector((state) => state.channels)
  const { user } = useSelector((state) => state.auth)

  const handleSend = () => {
    if (!text.trim()) return
    dispatch(sendMessage({
      channel: activeChannel,
      message: {
        id: Date.now(),
        user: user.name,
        avatar: user.avatar,
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    }))
    setText('')
  }

  return (
    <div className="input-area">
      <div className="input-box">
        <button className="input-icon">＋</button>
        <input
          type="text"
          placeholder={`Message #${activeChannel}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className="input-actions">
          <button className="input-icon">😊</button>
          <button className="input-icon">📎</button>
          <button
            className={`input-send ${text.trim() ? 'active' : ''}`}
            onClick={handleSend}
            disabled={!text.trim()}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageInput