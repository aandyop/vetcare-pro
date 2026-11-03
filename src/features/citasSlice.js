import { createSlice } from '@reduxjs/toolkit';

const citasSlice = createSlice({
  name: 'citas',
  initialState: {
    items: [],
  },
  reducers: {
    setCitas: (state, action) => {
      state.items = action.payload;
    },
    addCita: (state, action) => {
      state.items.push(action.payload);
    },
    updateCita: (state, action) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCita: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
});

export const { setCitas, addCita, updateCita, deleteCita } = citasSlice.actions;
export default citasSlice.reducer;