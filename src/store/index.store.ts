import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { resources } from '../common/api/api'
import { API } from '../common/api/api.d'

export const getResourseList = createAsyncThunk('getResourseList', async (params: API.Playload.Resources) => {
  const res = await resources(params)
  return res.data
})

export const counterSlice = createSlice({
  name: 'index',
  initialState: {
    value: 0,
    resourceData: {
      items: [],
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    } as API.Response.Resources
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    // decrement: state => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getResourseList.fulfilled, (state, action) => {
      state.resourceData = action.payload as unknown as API.Response.Resources
    })
  }
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions

export default counterSlice.reducer