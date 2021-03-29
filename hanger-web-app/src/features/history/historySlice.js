import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../common/utils/request'

export const fetchHistory = createAsyncThunk('history/fetchHistory', async (userId) => {
  const data = await get(`/users/${userId}/history`);
  return data;
});

export const addHistory = createAsyncThunk('history/createHistory', async (data) => {
  const response = await post(`/users/${data.ID}/history/create`, data);
  return response;
});

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    createdStatus: 'idle'
  },
  reducers: {
    updateHistoryCreatedStatus: (state, action) => {
      state.createdStatus = action.payload;
    },
  },
  extraReducers: {
    [fetchHistory.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchHistory.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload.history;
    },
    [fetchHistory.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addHistory.pending]: (state) => {
      state.createdStatus = 'loading'
    },
    [addHistory.fulfilled]: (state, action) => {
      state.createdStatus = 'succeeded'
      state.data.unshift(action.payload.history);
    },
    [addHistory.rejected]: (state, action) => {
      state.createdStatus = 'failed'
      state.error = action.error.message
    }
  }
});
export const { updateHistoryCreatedStatus } = historySlice.actions

export const selectAllHistory = state => state.history.data

export default historySlice.reducer;
