import { configureStore } from '@reduxjs/toolkit';
import pacientesReducer from '../features/pacientesSlice';
import citasReducer from '../features/citasSlice';
import inventarioReducer from '../features/inventarioSlice';

export const store = configureStore({
  reducer: {
    pacientes: pacientesReducer,
    citas: citasReducer,
    inventario: inventarioReducer,
  },
});