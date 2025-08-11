// redux/slices/booking.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking, cancelBooking, discardBooking, checkInBooking } from '../services/booking.service';

export const fetchCreateBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const data = await createBooking(bookingData);
      return data;
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data || 
                          error.message || 
                          'Có lỗi xảy ra khi tạo booking';
      
      console.error('❌ fetchCreateBooking error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      const data = await cancelBooking(bookingId);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data || 
                          error.message || 
                          'Có lỗi xảy ra khi CANCEL booking';
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchDiscardBooking = createAsyncThunk(
  'booking/discardBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      const data = await discardBooking(bookingId);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.error ||
                          error.response?.data ||
                          error.message ||
                          'Có lỗi xảy ra khi DISCARD booking';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCheckInBooking = createAsyncThunk(
  'booking/checkInBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      const data = await checkInBooking(bookingId);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
                          error.response?.data?.error ||
                          error.response?.data ||
                          error.message ||
                          'Có lỗi xảy ra khi check-in booking';
      return rejectWithValue(errorMessage);
    }
  }
);


const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: null,
    bookings: [], 
    loading: false,
    error: null,
    success: false, 
  },
  reducers: {
    clearBooking: (state) => {
      state.booking = null;
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
      // createBooking
      .addCase(fetchCreateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCreateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
        state.success = true;
        state.error = null;
        
        // Thêm booking vào list nếu có
        if (action.payload && !state.bookings.find(b => b.id === action.payload.id)) {
          state.bookings.push(action.payload);
        }
      })
      .addCase(fetchCreateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // cancelBooking
      .addCase(fetchCancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
        state.success = true;
        state.error = null; 
        
        // Update booking status in list
        if (action.payload?.id) {
          const index = state.bookings.findIndex(b => b.id === action.payload.id);
          if (index !== -1) {
            state.bookings[index] = action.payload;
          }
        }
      })
      .addCase(fetchCancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // discardBooking
      .addCase(fetchDiscardBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscardBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;

        // Update booking status in list
        if (action.payload?.id) {
          const index = state.bookings.findIndex(b => b.id === action.payload.id);
          if (index !== -1) {
            state.bookings[index] = action.payload;
          }
        }
      })
      .addCase(fetchDiscardBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // checkInBooking
      .addCase(fetchCheckInBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckInBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
        
        // Update booking in list if needed
        const updatedBooking = action.payload;
        const index = state.bookings.findIndex(b => b.id === updatedBooking.id);
        if (index !== -1) {
          state.bookings[index] = updatedBooking;
        }

      })
      .addCase(fetchCheckInBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBooking, clearError, clearSuccess } = bookingSlice.actions;

export default bookingSlice.reducer;