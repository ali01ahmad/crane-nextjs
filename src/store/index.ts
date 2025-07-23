import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import craneReducer from './slices/useCrane';

const store = configureStore({
  reducer: {
    user: userReducer,
    crane: craneReducer,
  },
});
export {store};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;