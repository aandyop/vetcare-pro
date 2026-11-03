import { createSlice } from '@reduxjs/toolkit';

const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState: {
    items: [],
  },
  reducers: {
    setPacientes: (state, action) => {
      state.items = action.payload;
    },
    addPaciente: (state, action) => {
      state.items.push(action.payload);
    },
    updatePaciente: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deletePaciente: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { setPacientes, addPaciente, updatePaciente, deletePaciente } = pacientesSlice.actions;
export default pacientesSlice.reducer;