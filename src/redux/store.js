// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice'; 
import hostReducer from './slices/host.slice'; 
import homestayReducer from './slices/homestay.slice'; 
import uploadReducer from './slices/upload.slice';
import bookingReducer from './slices/booking.slice';
// import imageUploadReducer from './slices/imageUpload.slice'; 
// import videoUploadReducer from './slices/videoUpload.slice'; 


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, 
    host: hostReducer,
    homestay: homestayReducer,
    upload: uploadReducer, 
    booking: bookingReducer, // Assuming you have a booking slice
    // uploadImage: imageUploadReducer,
    // uploadVideo: videoUploadReducer,
    
  },
});

export default store;
