// redux/slices/auth.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; 
import { login, registerSendOTP, verifyOTPAndRegister } from '../services/auth.service';

// Đăng nhập
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const data = await login(credentials);
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        // Lưu accountId vào AsyncStorage
        if (data.accountId) {
          await AsyncStorage.setItem('accountId', data.accountId.toString());
        }
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Gửi OTP đến email để đăng ký
export const sendRegisterOTP = createAsyncThunk(
  'auth/sendRegisterOTP',
  async (email, thunkAPI) => {
    try {
      const data = await registerSendOTP(email);
      return { email, message: data.message || 'OTP sent successfully' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify OTP và hoàn thành đăng ký
export const verifyAndRegister = createAsyncThunk(
  'auth/verifyAndRegister',
  async (registerData, thunkAPI) => {
    try {
      const data = await verifyOTPAndRegister(registerData);
      // Nếu API trả về token sau khi đăng ký thành công
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        if (data.accountId) {
          await AsyncStorage.setItem('accountId', data.accountId.toString());
        }
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Khôi phục trạng thái đăng nhập từ AsyncStorage
export const restoreAuthState = createAsyncThunk(
  'auth/restoreAuthState',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const accountId = await AsyncStorage.getItem('accountId');
      
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        // Check if token is expired
        if (decoded.exp < currentTime) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('accountId');
          return null;
        }
        
        return {
          token,
          role: decoded.role,
          userName: decoded.sub,
          accountId: accountId ? parseInt(accountId) : null,
        };
      }
      return null;
    } catch (error) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('accountId');
      return thunkAPI.rejectWithValue('Failed to restore auth state');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    // Thêm state cho registration flow
    registration: {
      loading: false,
      error: null,
      otpSent: false,
      email: null,
      isRegistering: false,
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('accountId');
    },
    clearError: (state) => {
      state.error = null;
      state.registration.error = null;
    },
    resetRegistration: (state) => {
      state.registration = {
        loading: false,
        error: null,
        otpSent: false,
        email: null,
        isRegistering: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { accountId, userName, token } = action.payload;
        
        state.user = { accountId, userName };
        state.token = token;
        
        try {
          const decoded = jwtDecode(token);
          state.role = decoded.role || null;
        } catch (e) {
          state.role = null;
        }
        
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Gửi OTP đăng ký
      .addCase(sendRegisterOTP.pending, (state) => {
        state.registration.loading = true;
        state.registration.error = null;
      })
      .addCase(sendRegisterOTP.fulfilled, (state, action) => {
        state.registration.loading = false;
        state.registration.otpSent = true;
        state.registration.email = action.payload.email;
        state.registration.error = null;
      })
      .addCase(sendRegisterOTP.rejected, (state, action) => {
        state.registration.loading = false;
        state.registration.error = action.payload;
        state.registration.otpSent = false;
      })
      
      // Verify OTP và đăng ký
      .addCase(verifyAndRegister.pending, (state) => {
        state.registration.loading = true;
        state.registration.isRegistering = true;
        state.registration.error = null;
      })
      .addCase(verifyAndRegister.fulfilled, (state, action) => {
        state.registration.loading = false;
        state.registration.isRegistering = false;
        
        // Nếu API trả về token (tự động đăng nhập sau đăng ký)
        if (action.payload.token) {
          const { accountId, userName, token } = action.payload;
          state.user = { accountId, userName };
          state.token = token;
          
          try {
            const decoded = jwtDecode(token);
            state.role = decoded.role || null;
          } catch (e) {
            state.role = null;
          }
          
          state.isAuthenticated = true;
        }
        
        // Reset registration state
        state.registration = {
          loading: false,
          error: null,
          otpSent: false,
          email: null,
          isRegistering: false,
        };
      })
      .addCase(verifyAndRegister.rejected, (state, action) => {
        state.registration.loading = false;
        state.registration.isRegistering = false;
        state.registration.error = action.payload;
      })
      
      // Khôi phục đăng nhập
      .addCase(restoreAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.token) {
          state.token = action.payload.token;
          state.role = action.payload.role || null;
          state.user = {
            userName: action.payload.userName,
            accountId: action.payload.accountId,
          };
          state.isAuthenticated = true;
        }
      })
      .addCase(restoreAuthState.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, resetRegistration } = authSlice.actions;
export default authSlice.reducer;