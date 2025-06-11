// redux/slices/user.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByAccount, updateUserByAccount, updateUserAvatar } from '../services/user.service';

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

// Async thunk for updating user profile by account ID
export const updateUserProfileByAccount = createAsyncThunk(
  'user/updateUserProfileByAccount',
  async ({ accountId, userData }, { rejectWithValue }) => {
    try {
      const data = await updateUserByAccount(accountId, userData);
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

// Async thunk for updating user avatar by account ID
export const updateUserAvatarByAccount = createAsyncThunk(
  'user/updateUserAvatarByAccount',
  async ({ accountId, imageData }, { rejectWithValue }) => {
    try {
      const data = await updateUserAvatar(accountId, imageData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Có lỗi xảy ra khi cập nhật avatar'
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
  avatarUpdateLoading: false,
  avatarUpdateError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
      state.avatarUpdateError = null;
    },
    
    // Clear user profile
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

    // Update avatar locally (optimistic update)
    updateAvatarLocal: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, image: action.payload };
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

      // Update user profile by account ID
      .addCase(updateUserProfileByAccount.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserProfileByAccount.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile = action.payload; 
        state.updateError = null;
      })
      .addCase(updateUserProfileByAccount.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // Update user avatar by account ID
      .addCase(updateUserAvatarByAccount.pending, (state) => {
        state.avatarUpdateLoading = true;
        state.avatarUpdateError = null;
      })
      .addCase(updateUserAvatarByAccount.fulfilled, (state, action) => {
        state.avatarUpdateLoading = false;
        // Cập nhật avatar trong profile hiện tại
        if (state.profile) {
          state.profile = { ...state.profile, image: action.payload.image };
        }
        state.avatarUpdateError = null;
      })
      .addCase(updateUserAvatarByAccount.rejected, (state, action) => {
        state.avatarUpdateLoading = false;
        state.avatarUpdateError = action.payload;
      });
  },
});

// Export actions
export const { 
  clearError, 
  clearUserProfile, 
  updateProfileLocal, 
  updateAvatarLocal 
} = userSlice.actions;

// Selectors
// fetchUserByAccount
export const selectUserProfile = (state) => state.user.profile;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

// updateUserProfileByAccount
export const selectUpdateLoading = (state) => state.user.updateLoading;
export const selectUpdateError = (state) => state.user.updateError;

// updateUserAvatarByAccount
export const selectAvatarUpdateLoading = (state) => state.user.avatarUpdateLoading;
export const selectAvatarUpdateError = (state) => state.user.avatarUpdateError;

// Export reducer
export default userSlice.reducer;