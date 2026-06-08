import { useSelector } from 'react-redux'
import './Header.css'

function Header() {
  const { activeChannel } = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages.byChannel[activeChannel] || [])

  const handleInvite = () => {
    const inviteLink = window.location.href
    navigator.clipboard.writeText(inviteLink)
    alert('✅ Invite link copied to clipboard!\nShare this link with your friends to join.')
  }

  return (
    <div className="header">
      <div className="header__left">
        <span className="header__hash">#</span>
        <h2 className="header__channel">{activeChannel}</h2>
        <span className="header__divider">|</span>
        <span className="header__desc">{messages.length} messages</span>
      </div>
      <div className="header__right">
        <button className="header__btn" title="Search">🔍</button>
        <button className="header__btn" title="Members">👥</button>
        <button className="header__invite" onClick={handleInvite}>
          + Invite People
        </button>
      </div>
    </div>
  )
}

export default Header