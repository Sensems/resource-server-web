import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './index.store'
import userSlice from './user.store'

export default configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice
  }
})