// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice'; 
import hostReducer from './slices/host.slice'; 
import homestayReducer from './slices/homestay.slice'; 
import uploadReducer from './slices/upload.slice'; 


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, 
    host: hostReducer,
    homestay: homestayReducer,
    upload: uploadReducer, 
    
  },
});

export default store;
