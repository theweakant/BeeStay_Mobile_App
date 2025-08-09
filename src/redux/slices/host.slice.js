import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHostByAccount, getBookingByHost, getDashboardByHost } from '../services/host.service';


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

export const fetchDashboardByHost = createAsyncThunk(
  'host/fetchDashboardByHost',
  async (accountId, thunkAPI) => {
    try {
      const data = await getDashboardByHost(accountId);
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

    bookings: [],
    bookingLoading: false, 
    bookingError: null, 

    dashboard: null,
    dashboardLoading: false,
    dashboardError: null,
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

    clearDashboard: (state) => {
      state.dashboard = null;
      state.dashboardLoading = false;
      state.dashboardError = null;
    },
  },
  extraReducers: (builder) => {

    //host
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
      })

      //booking
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
      })

      //dashboard
      .addCase(fetchDashboardByHost.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(fetchDashboardByHost.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardByHost.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = action.payload;
      })
  },
});

export const { clearHost, clearBooking, clearDashboard } = hostSlice.actions;

export default hostSlice.reducer;
