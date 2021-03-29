import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../common/utils/request'

export const fetchUser = createAsyncThunk('user/fetchUser', async (data) => {
  const response = await post(`/users/login`, data);
  return response;
});

export const createUser = createAsyncThunk('user/createUser', async (data) => {
  const response = await post(`/users/create`, data);
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    error: null
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loginStatus = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loginStatus = 'succeeded'
      const { email, ID } = action.payload.user;
      state.id = ID;
      state.email = email;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loginStatus = 'failed';
      state.error = action.error.message;
    },
    [createUser.pending]: (state) => {
      state.signupStatus = 'loading';
    },
    [createUser.fulfilled]: (state, action) => {
      state.signupStatus = 'succeeded'
      const { email, ID } = action.payload.user;
      state.id = ID;
      state.email = email;
    },
    [createUser.error]: (state, action) => {
      state.signupStatus = 'failed';
      state.error = action.error.message;
    },
  }
});

export const selectUserId = state => state.user.id;
export const selectUserEmail = state => state.user.email;

export default userSlice.reducer;
