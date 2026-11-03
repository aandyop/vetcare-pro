import { createSlice } from '@reduxjs/toolkit';

const inventarioSlice = createSlice({
  name: 'inventario',
  initialState: {
    items: [],
  },
  reducers: {
    setInventario: (state, action) => {
      state.items = action.payload;
    },
    addProducto: (state, action) => {
      state.items.push(action.payload);
    },
    updateProducto: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProducto: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { setInventario, addProducto, updateProducto, deleteProducto } = inventarioSlice.actions;
export default inventarioSlice.reducer;