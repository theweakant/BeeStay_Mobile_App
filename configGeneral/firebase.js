// // firebase.js

// import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCCzqN7bVTZgR-H_O9VWGkcwx_Wko-yWZA",
//   authDomain: "beestay-a2196.firebaseapp.com",
//   projectId: "beestay-a2196",
//   storageBucket: "beestay-a2196.firebasestorage.app",
//   messagingSenderId: "491133757238",
//   appId: "1:491133757238:web:7133c69751c1741be87597",
//   measurementId: "G-7X3BN7PT3N"
// };

// // Khởi tạo Firebase App
// const app = initializeApp(firebaseConfig);

// // Khởi tạo Analytics (nếu hỗ trợ)
// let analytics;
// isSupported().then((supported) => {
//   if (supported) {
//     analytics = getAnalytics(app);
//   }
// });

// // Khởi tạo Auth với AsyncStorage
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// // Các service khác
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { app, analytics, auth, db, storage };