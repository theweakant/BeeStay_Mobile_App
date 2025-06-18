// redux/slices/auth.slice.js 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; 
import { login, sendOTP, verifyOTPAndRegister } from '../services/auth.service';

// Đăng nhập
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const data = await login(credentials);
      
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        if (data.refreshToken) {
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
        }
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

export const sendRegisterOTP = createAsyncThunk(
  'auth/sendRegisterOTP',
  async (email, thunkAPI) => {
    try {
      const data = await sendOTP(email);
      return { email, message: data.message || 'OTP sent successfully' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyAndRegister = createAsyncThunk(
  'auth/verifyAndRegister',
  async (registerData, thunkAPI) => {
    try {
      const data = await verifyOTPAndRegister(registerData);
      
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        if (data.refreshToken) {
          await AsyncStorage.setItem('refreshToken', data.refreshToken);
        }
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

export const restoreAuthState = createAsyncThunk(
  'auth/restoreAuthState',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const accountId = await AsyncStorage.getItem('accountId');
      
      if (token) {
        const decoded = jwtDecode(token);
        return {
          token,
          refreshToken,
          role: decoded.role,
          userName: decoded.sub,
          accountId: accountId ? parseInt(accountId) : null,
        };
      }
      return null;
    } catch (error) {
      await AsyncStorage.multiRemove(['token', 'refreshToken', 'accountId']);
      return thunkAPI.rejectWithValue('Failed to restore auth state');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    role: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    registration: {
      step: 1,
      loading: false,
      error: null,
      otpSent: false,
      email: '',
      formData: {
        userName: '',
        password: '',
        role: '',
        otp: '',
      },
      otpExpiry: null,
      isComplete: false,
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.multiRemove(['token', 'refreshToken', 'accountId']);
    },
    clearError: (state) => {
      state.error = null;
      state.registration.error = null;
    },
    resetRegistration: (state) => {
      state.registration = {
        step: 1,
        loading: false,
        error: null,
        otpSent: false,
        email: '',
        formData: {
          userName: '',
          password: '',
          role: '',
          otp: '',
        },
        otpExpiry: null,
        isComplete: false,
      };
    },
    setRegistrationEmail: (state, action) => {
      state.registration.email = action.payload;
    },
    setRegistrationFormData: (state, action) => {
      state.registration.formData = {
        ...state.registration.formData,
        ...action.payload,
      };
    },
    nextRegistrationStep: (state) => {
      state.registration.step += 1;
    },
    prevRegistrationStep: (state) => {
      state.registration.step -= 1;
    },
    setRegistrationStep: (state, action) => {
      state.registration.step = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { accountId, userName, token, refreshToken, role } = action.payload;
        state.user = { accountId, userName, role: role || null };
        state.token = token;
        state.refreshToken = refreshToken;
        state.role = role || (() => {
          try {
            const decoded = jwtDecode(token);
            return decoded.role || null;
          } catch {
            return null;
          }
        })();
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      .addCase(sendRegisterOTP.pending, (state) => {
        state.registration.loading = true;
        state.registration.error = null;
      })
      .addCase(sendRegisterOTP.fulfilled, (state, action) => {
        state.registration.loading = false;
        state.registration.otpSent = true;
        state.registration.email = action.payload.email;
        state.registration.error = null;
        state.registration.step = 2; 
        state.registration.otpExpiry = Date.now() + 5 * 60 * 1000;
      })
      .addCase(sendRegisterOTP.rejected, (state, action) => {
        state.registration.loading = false;
        state.registration.error = action.payload;
        state.registration.otpSent = false;
      })

      .addCase(verifyAndRegister.pending, (state) => {
        state.registration.loading = true;
        state.registration.error = null;
      })
      .addCase(verifyAndRegister.fulfilled, (state, action) => {
        state.registration.loading = false;
        state.registration.isComplete = true;
        state.registration.step = 3;
        if (action.payload.token) {
          const { accountId, userName, token, refreshToken, role } = action.payload;
          state.user = { accountId, userName, role: role || null };
          state.token = token;
          state.refreshToken = refreshToken;
          state.role = role || (() => {
            try {
              const decoded = jwtDecode(token);
              return decoded.role || null;
            } catch {
              return null;
            }
          })();
          state.isAuthenticated = true;
        }
        state.registration.error = null;
      })
      .addCase(verifyAndRegister.rejected, (state, action) => {
        state.registration.loading = false;
        state.registration.error = action.payload;
      })

      .addCase(restoreAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.token) {
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.role = action.payload.role || null;
          state.user = {
            userName: action.payload.userName,
            accountId: action.payload.accountId,
            role: action.payload.role || null,
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

export const { 
  logout, 
  clearError, 
  resetRegistration,
  setRegistrationEmail,
  setRegistrationFormData,
  nextRegistrationStep,
  prevRegistrationStep,
  setRegistrationStep,
} = authSlice.actions;

export default authSlice.reducer;
