import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: ['general', 'random', 'dev-talk', 'design', 'announcements'],
    activeChannel: 'general',
  },
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    },
    addChannel: (state, action) => {
      const name = action.payload.trim().toLowerCase().replace(/\s+/g, '-')
      if (name && !state.list.includes(name)) {
        state.list.push(name)
      }
    },
  },
})

export const { setActiveChannel, addChannel } = channelsSlice.actions
export default channelsSlice.reducer