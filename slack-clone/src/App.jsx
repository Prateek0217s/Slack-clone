import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'
import ChatArea from './components/chatarea/chatarea'
import MessageInput from './components/messageinput/messageinput'
import './App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <ChatArea />
        <MessageInput />
      </div>
    </div>
  )
}

export default App