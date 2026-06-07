import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth'
import channelsReducer from '../features/channels/channel'
import messagesReducer from '../features/messages/message'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
})