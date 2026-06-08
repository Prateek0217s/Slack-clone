import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byChannel: {
      general: [
        { id: 1, user: 'Prateek', avatar: 'P', text: 'Welcome to #general! This is the beginning of the channel.', time: '9:00 AM' },
        { id: 2, user: 'Raj', avatar: 'R', text: 'Hey everyone! Excited to be here ', time: '9:05 AM' },
      ],
      random: [
        { id: 1, user: 'Devansh', avatar: 'D', text: 'Anyone up for a code review session?', time: '10:00 AM' },
      ],
      'dev-talk': [
        { id: 1, user: 'Prateek', avatar: 'P', text: 'Just pushed the new Redux setup  Check it out!', time: '11:00 AM' },
      ],
      design: [],
      announcements: [
        { id: 1, user: 'Admin', avatar: 'AD', text: 'Team standup at 10am daily! ', time: '8:00 AM' },
      ],
    },
  },
  reducers: {
    sendMessage: (state, action) => {
      const { channel, message } = action.payload
      if (!state.byChannel[channel]) state.byChannel[channel] = []
      state.byChannel[channel].push(message)
    },
    addChannelMessages: (state, action) => {
      const { channel } = action.payload
      if (!state.byChannel[channel]) state.byChannel[channel] = []
    },
  },
})

export const { sendMessage, addChannelMessages } = messagesSlice.actions
export default messagesSlice.reducer
