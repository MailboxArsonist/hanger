import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from '../features/workout/workoutSlice';
import historyReducer from '../features/history/historySlice';
import userSlice from '../features/user/userSlice';

export default configureStore({
  reducer: {
    workout: workoutReducer,
    history: historyReducer,
    user: userSlice,
  },
});
