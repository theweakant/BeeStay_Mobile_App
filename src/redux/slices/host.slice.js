import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHostByAccount, getBookingByHost } from '../services/host.service';


export const fetchHostByAccount = createAsyncThunk(
  'host/fetchHostByAccount',
  async (accountId, thunkAPI) => {
    try {
      const data = await getHostByAccount(accountId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const fetchBookingByHost = createAsyncThunk(
  'host/fetchBookingByHost',
  async (accountId, thunkAPI) => {
    try {
      const data = await getBookingByHost(accountId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const hostSlice = createSlice({
  name: 'host',
  initialState: {
    host: null,
    loading: false,
    error: null,

    bookings: [], // Thêm state để lưu trữ booking 
    bookingLoading: false, // Thêm state để theo dõi trạng thái loading của booking
    bookingError: null, // Thêm state để lưu trữ lỗi khi lấy booking
  },
  reducers: {
    clearHost: (state) => {
      state.host = null;
      state.loading = false;
      state.error = null;
    },

        clearBooking: (state) => {
      state.bookings = [];
      state.bookingLoading = false;
      state.bookingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostByAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostByAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.host = action.payload;
      })
      .addCase(fetchHostByAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

          // Fetch Booking By Host
    builder
      .addCase(fetchBookingByHost.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
      })
      .addCase(fetchBookingByHost.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingByHost.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = action.payload;
      });
  },
});

export const { clearHost } = hostSlice.actions;

export default hostSlice.reducer;
