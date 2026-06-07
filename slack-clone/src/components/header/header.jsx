import { useSelector } from 'react-redux'
import './header.css'

function Header() {
  const { activeChannel } = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages.byChannel[activeChannel] || [])

  return (
    <div className="header">
      <div className="header__left">
        <span className="header__hash">#</span>
        <h2 className="header__channel">{activeChannel}</h2>
        <span className="header__divider">|</span>
        <span className="header__desc">{messages.length} messages</span>
      </div>
      <div className="header__right">
        <button className="header__btn">🔍</button>
        <button className="header__btn">👥</button>
        <button className="header__btn">📌</button>
      </div>
    </div>
  )
}

export default Header