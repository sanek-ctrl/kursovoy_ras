import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { goalReducer } from './slices/goalSlice'; 
import { adminReducer } from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer, 
    admin: adminReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;