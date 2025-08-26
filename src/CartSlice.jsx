import { createSlice } from '@reduxjs/toolkit';

// cart item shape: { name, category, image_url, description, cost, quantity }

const initialState = {
  items: [],
};

// Handles "$89.99", "R$ 39,90", "1,299.50", "1.299,50"
const parseCost = (raw) => {
  if (raw == null) return 0;
  let s = String(raw).trim();

  // remove currency and spaces
  s = s.replace(/R\$\s?|\$\s?/g, '').replace(/\s+/g, '');

  const hasDot = s.includes('.');
  const hasComma = s.includes(',');

  if (hasDot && hasComma) {
    // assume BR format like 1.299,50 -> remove thousands dot, use comma as decimal
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (!hasDot && hasComma) {
    // 39,90 -> decimal is comma
    s = s.replace(',', '.');
  } else {
    // 89.99 or 1299 -> already good
  }

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};


const findIndexByName = (arr, name) => arr.findIndex((it) => it.name === name);

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload; // { name, cost, ... }
      const idx = findIndexByName(state.items, product.name);
      if (idx >= 0) {
        state.items[idx].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const name = action.payload; // product name
      state.items = state.items.filter((it) => it.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload; // amount is the new quantity
      const idx = findIndexByName(state.items, name);
      if (idx >= 0) {
        state.items[idx].quantity = amount < 1 ? 1 : amount;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

/* ----------------- Selectors ----------------- */
export const selectCartItems = (state) => state.cart.items;

export const selectTotalQuantity = (state) =>
    state.cart.items.reduce((sum, it) => sum + it.quantity, 0);

export const selectTotalAmount = (state) =>
    state.cart.items.reduce((sum, it) => sum + parseCost(it.cost) * it.quantity, 0);
/* --------------------------------------------- */

export default CartSlice.reducer;
