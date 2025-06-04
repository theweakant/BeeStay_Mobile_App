// redux/slices/auth.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../services/auth.service';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const data = await login(credentials);
      
      // Lưu token vào AsyncStorage nếu có
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thêm action để khôi phục auth state từ AsyncStorage
export const restoreAuthState = createAsyncThunk(
  'auth/restoreAuthState',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Có thể gọi API để verify token và lấy user info
        // Hoặc decode JWT để lấy thông tin cơ bản
        return { token };
      }
      return null;
    } catch (error) {
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
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Xóa token khỏi AsyncStorage
      AsyncStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Xử lý role từ response - có thể là từ user object hoặc trực tiếp từ payload
        state.role = action.payload.user?.role || action.payload.role || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Restore auth state cases
      .addCase(restoreAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.token) {
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(restoreAuthState.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;