// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
// import các slice khác nếu cần

const store = configureStore({
  reducer: {
    auth: authReducer,
    // ...other reducers
  },
});

export default store;
