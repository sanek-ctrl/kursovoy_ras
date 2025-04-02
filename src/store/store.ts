import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { goalReducer } from './slices/goalSlice'; // Добавляем импорт редьюсера целей
import { adminReducer } from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer, // Добавляем редьюсер целей в хранилище
    admin: adminReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;