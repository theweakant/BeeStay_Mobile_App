// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice'; 
// import các slice khác nếu cần

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // Add user slice to the store
    // ...other reducers
  },
});

export default store;
