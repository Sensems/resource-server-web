import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './index.store'

export default configureStore({
  reducer: {
    counter: counterSlice
  }
})