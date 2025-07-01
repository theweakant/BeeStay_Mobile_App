// redux/slices/review.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addReview } from '../services/review.service';

export const fetchAddReview = createAsyncThunk(
  'review/addReview',
  async ({ accountId, stayCationId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await addReview(accountId, stayCationId, reviewData);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.error ||
                          error.response?.data ||
                          error.message ||
                          'Có lỗi xảy ra khi gửi review';
      return rejectWithValue(errorMessage);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    review: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearReview: (state) => {
      state.review = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAddReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchAddReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearReview, clearError, clearSuccess } = reviewSlice.actions;

export default reviewSlice.reducer;
