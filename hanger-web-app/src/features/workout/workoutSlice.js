import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put } from '../../common/utils/request';

export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async (userID) => {
  const response = await get(`/users/${userID}/workouts`);
  return response;
});

export const createWorkout = createAsyncThunk('workouts/createWorkout', async (data) => {
  const response = await post(`/users/${data.ID}/workouts/createWorkout`, data);
  return response;
});

export const updateWorkout = createAsyncThunk('workouts/updateWorkout', async (data) => {
  const response = await put(`/users/${data.ID}/workouts/updateWorkout`, data);
  return response;
});

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState: {
    data: [],
    listStatus: 'idle',
    createdStatus: 'idle',
    updatedStatus: 'idle',
    error: null
  },
  extraReducers: {
    [fetchWorkouts.pending]: (state) => {
      state.listStatus = 'loading';
    },
    [fetchWorkouts.fulfilled]: (state, action) => {
      state.listStatus = 'succeeded'
      state.data = action.payload.workouts;
    },
    [fetchWorkouts.rejected]: (state, action) => {
      state.listStatus = 'failed';
      state.error = action.error.message;
    },
    [createWorkout.pending]: (state) => {
      state.createdStatus = 'loading';
    },
    [createWorkout.fulfilled]: (state, action) => {
      state.createdStatus = 'succeeded'
      state.data = state.data.concat(action.payload.workout);
    },
    [createWorkout.rejected]: (state, action) => {
      state.createdStatus = 'failed';
      state.error = action.error.message;
    },
    [updateWorkout.pending]: (state) => {
      state.updatedStatus = 'loading';
    },
    [updateWorkout.fulfilled]: (state, action) => {
      state.updatedStatus = 'succeeded'
      state.data = state.data.map(workout => {
        return action.payload.workout.SK === workout.SK ? action.payload.workout : workout;
      });
    },
    [updateWorkout.rejected]: (state, action) => {
      state.updatedStatus = 'failed';
      state.error = action.error.message;
    }
  }
});

export const selectAllWorkouts = state => state.workout.data;

export default workoutSlice.reducer;
