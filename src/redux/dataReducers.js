import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'UserD',
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state, action) => {
      state.value = action.payload;
    },
    deleteData: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
