import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './date/dateSlice';
import viewerReducer from './view/viewSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    viewer: viewerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;