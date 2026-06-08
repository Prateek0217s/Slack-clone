import { useState } from 'react'
import { auth } from '../../firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/auth/auth'
import './login.css'

function Login() {
  const dispatch = useDispatch()
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(result.user, { displayName: name })
        dispatch(setUser({
          uid: result.user.uid,
          name: name,
          email: result.user.email,
          avatar: name.charAt(0).toUpperCase(),
        }))
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password)
        dispatch(setUser({
          uid: result.user.uid,
          name: result.user.displayName || result.user.email,
          email: result.user.email,
          avatar: (result.user.displayName || result.user.email).charAt(0).toUpperCase(),
        }))
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    }
    setLoading(false)
  }

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__logo">💬</div>
        <h1 className="login__title">DevTeam</h1>
        <p className="login__subtitle">{isSignup ? 'Create your account' : 'Sign in to your workspace'}</p>

        {error && <div className="login__error">{error}</div>}

        {isSignup && (
          <input
            className="login__input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        <button className="login__btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
        </button>

        <p className="login__toggle">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? ' Sign In' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login