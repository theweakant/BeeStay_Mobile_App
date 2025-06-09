// redux/slices/user.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByAccount, updateUser } from '../services/user.service';

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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await updateUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Có lỗi xảy ra khi cập nhật thông tin người dùng'
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
      })

      //updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile = action.payload; 
        state.updateError = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });

      
  },
});

// Export actions - Cập nhật tên action export
export const { clearError, clearUserProfile, updateProfileLocal } = userSlice.actions;

// Selectors
//fetchUserByAccount
export const selectUserProfile = (state) => state.user.profile;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

//updateUserProfile
export const selectUpdateLoading = (state) => state.user.updateLoading;
export const selectUpdateError = (state) => state.user.updateError;

// Export reducer
export default userSlice.reducer;