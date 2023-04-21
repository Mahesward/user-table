import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import { dataSlice } from './dataReducers';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  data: persistReducer({ key: 'data', storage }, dataSlice.reducer),
});

const store = configureStore({
  reducer: rootReducer,
});

export const presistor = persistStore(store);
export default store;
