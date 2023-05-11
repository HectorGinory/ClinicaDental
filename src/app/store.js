import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../pages/userSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userSlice
})

// REVISAR QUE HACE ESTO
const persistConfig = {
  key: 'root',
  storage,
}

// REVISAR QUE HACE ESTO
const persistedReducer = persistReducer(persistConfig, reducers);


// REVISAR QUE HACE ESTO
export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});