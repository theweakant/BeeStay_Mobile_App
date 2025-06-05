// redux/slices/user.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByAccount } from '../services/user.service';

// Async thunk for fetching user by account ID
export const fetchUserByAccount = createAsyncThunk(
  'user/fetchUserByAccount',
  async (accountId, { rejectWithValue }) => {
    try {
      const data = await getUserByAccount(accountId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Có lỗi xảy ra khi tải thông tin người dùng'
      );
    }
  }
);

// Initial state
const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
    },
    
    // Clear user profile - Đổi tên từ clearProfile thành clearUserProfile
    clearUserProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
    
    // Update profile locally (optimistic update)
    updateProfileLocal: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user by account
      .addCase(fetchUserByAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserByAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profile = null;
      });
  },
});

// Export actions - Cập nhật tên action export
export const { clearError, clearUserProfile, updateProfileLocal } = userSlice.actions;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

// Export reducer
export default userSlice.reducer;