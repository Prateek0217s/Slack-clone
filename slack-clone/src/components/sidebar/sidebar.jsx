import { useSelector, useDispatch } from 'react-redux'
import { setActiveChannel, addChannel } from '../../features/channels/channel'
import { addChannelMessages } from '../../features/messages/message'
import { useState } from 'react'
import './sidebar.css'

function Sidebar() {
  const dispatch = useDispatch()
  const { list, activeChannel } = useSelector((state) => state.channels)
  const { user } = useSelector((state) => state.auth)
  const [showInput, setShowInput] = useState(false)
  const [newChannel, setNewChannel] = useState('')

  const handleAddChannel = () => {
    if (newChannel.trim()) {
      dispatch(addChannel(newChannel))
      dispatch(addChannelMessages({ channel: newChannel.trim().toLowerCase().replace(/\s+/g, '-') }))
      setNewChannel('')
      setShowInput(false)
    }
  }

  return (
    <div className="sidebar">

      <div className="sidebar__workspace">
        <h1 className="sidebar__workspace-name">DevTeam</h1>
        <span className="sidebar__status">● Active</span>
      </div>


      <div className="sidebar__user">
        <div className="sidebar__avatar">{user.avatar}</div>
        <span className="sidebar__username">{user.name}</span>
      </div>


      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <span>Channels</span>
          <button className="sidebar__add-btn" onClick={() => setShowInput(!showInput)}>+</button>
        </div>

        {showInput && (
          <div className="sidebar__new-channel">
            <input
              type="text"
              placeholder="channel-name"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddChannel()}
              autoFocus
            />
            <button onClick={handleAddChannel}>Add</button>
          </div>
        )}

        <ul className="sidebar__channels">
          {list.map((channel) => (
            <li
              key={channel}
              className={`sidebar__channel ${activeChannel === channel ? 'active' : ''}`}
              onClick={() => dispatch(setActiveChannel(channel))}
            >
              <span className="sidebar__hash">#</span> {channel}
            </li>
          ))}
        </ul>
      </div>


      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <span>Direct Messages</span>
        </div>
        <ul className="sidebar__channels">
          {['Raj', 'Devash', 'Mayank'].map((person) => (
            <li key={person} className="sidebar__channel sidebar__dm">
              <span className="sidebar__dm-dot">●</span> {person}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar