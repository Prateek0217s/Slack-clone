import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setUser, clearUser, setError } = authSlice.actions
export default authSlice.reducer