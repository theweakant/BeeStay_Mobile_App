// redux/slices/booking.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking, cancelBooking } from '../services/booking.service';

// Async thunk: Tạo booking
export const fetchCreateBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, thunkAPI) => {
    try {
      const data = await createBooking(bookingData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk: Hủy booking
export const fetchCancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async (bookingId, thunkAPI) => {
    try {
      const data = await cancelBooking(bookingId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBooking: (state) => {
      state.booking = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createBooking
      .addCase(fetchCreateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchCreateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // cancelBooking
      .addCase(fetchCancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchCancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
