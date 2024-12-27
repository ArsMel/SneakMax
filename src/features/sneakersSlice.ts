import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ReactNode } from 'react';

interface Sneaker {
  gender: string;
  sizes: any;
  description: ReactNode;
  id: number;
  title: string;
  price: number;
  imgUrl: string;
}

interface SneakersState {
  items: Sneaker[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SneakersState = {
  items: [],
  status: 'idle',
};

export const fetchSneakers = createAsyncThunk('sneakers/fetchSneakers', async () => {
  const response = await axios.get('https://cb91213a01996430.mokky.dev/sneakers');
  return response.data;
});

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSneakers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSneakers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSneakers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default sneakersSlice.reducer;