import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { dataSlice } from './dataReducers';

const rootReducer = combineReducers({
  data: dataSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
