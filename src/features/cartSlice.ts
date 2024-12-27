import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  quantity: number;
  selectedSize: number | null;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      );
    },
    incrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;