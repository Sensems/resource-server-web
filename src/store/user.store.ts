import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../common/api/api'
import { API } from '../common/api/api.d'

export const userLogin = createAsyncThunk('userLogin', async (params: API.Playload.Login) => {
  const res = await login(params)
  return res.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : {
      username: '',
      password: '',
      role: '',
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      window.localStorage.setItem('userInfo', JSON.stringify(action.payload))
      state.userInfo = action.payload as unknown as API.Response.UserInfo
    })
  }
})

export default userSlice.reducer