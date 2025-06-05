// redux/slices/auth.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; 
import { login } from '../services/auth.service';

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

// Khôi phục trạng thái đăng nhập từ AsyncStorage
export const restoreAuthState = createAsyncThunk(
  'auth/restoreAuthState',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const accountId = await AsyncStorage.getItem('accountId'); // Lấy accountId
      
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        // Check if token is expired
        if (decoded.exp < currentTime) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('accountId'); // Xóa accountId khi token hết hạn
          return null;
        }
        
        return {
          token,
          role: decoded.role,
          userName: decoded.sub,
          accountId: accountId ? parseInt(accountId) : null, // Thêm accountId
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
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('accountId'); // Xóa accountId khi logout
    },
    clearError: (state) => {
      state.error = null;
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
            accountId: action.payload.accountId, // Thêm accountId
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

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;