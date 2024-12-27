import { configureStore } from '@reduxjs/toolkit';
import sneakersReducer from '../features/sneakersSlice';
import cartReducer from '../features/cartSlice';
import teamReducer from "../features/teamSlice";

export const store = configureStore({
  reducer: {
    sneakers: sneakersReducer,
    cart: cartReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;