import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser, clearUser } from './features/auth/auth'
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'
import ChatArea from './components/chatarea/chatarea'
import MessageInput from './components/messageinput/messageinput'
import Login from './components/login/login'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email,
          email: firebaseUser.email,
          avatar: (firebaseUser.displayName || firebaseUser.email).charAt(0).toUpperCase(),
        }))
      } else {
        dispatch(clearUser())
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  if (!user) return <Login />

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