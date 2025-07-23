// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Crane {
  id: string;
  serial_number: string;
  model: string;
  location: string;
  status: string;
}

interface CraneState {
  cranes: Crane[];
}

const initialState: CraneState = {
  cranes: [],
};
const craneSlice = createSlice({
  name: 'cranes',
  initialState,
  reducers: {
    setCranes(state, action: PayloadAction<Crane[]>) {
      state.cranes = action.payload;
    },
    addCrane(state, action: PayloadAction<Crane>) {
      state.cranes.push(action.payload);
    },
    clearCranes(state) {
      state.cranes = [];
    },
  },
});

export const { setCranes, addCrane, clearCranes } = craneSlice.actions;
export default craneSlice.reducer;

