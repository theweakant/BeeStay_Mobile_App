// redux/slices/homestaySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHomestays } from '../services/homestay.service';

// Async thunk: Lấy tất cả homestays
export const fetchAllHomestays = createAsyncThunk(
  'homestay/fetchAllHomestays',
  async (_, thunkAPI) => {
    try {
      const data = await getAllHomestays();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const homestaySlice = createSlice({
  name: 'homestay',
  initialState: {
    homestays: [],
    selectedHomestay: null,
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {
    clearHomestays: (state) => {
      state.homestays = [];
      state.selectedHomestay = null;
      state.loading = false;
      state.error = null;
      state.totalCount = 0;
    },
    clearSelectedHomestay: (state) => {
      state.selectedHomestay = null;
    },
    setSelectedHomestay: (state, action) => {
      state.selectedHomestay = action.payload;
    },
    // Filter homestays by criteria
    filterHomestays: (state, action) => {
      const { criteria } = action.payload;
      // You can implement filtering logic here based on your needs
      // For example: price range, rating, features, etc.
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all homestays
      .addCase(fetchAllHomestays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHomestays.fulfilled, (state, action) => {
        state.loading = false;
        state.homestays = action.payload;
        state.totalCount = action.payload?.length || 0;
      })
      .addCase(fetchAllHomestays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearHomestays, 
  clearSelectedHomestay, 
  setSelectedHomestay, 
  filterHomestays 
} = homestaySlice.actions;

export default homestaySlice.reducer;