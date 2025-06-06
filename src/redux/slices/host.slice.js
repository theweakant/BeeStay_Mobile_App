import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHostByAccount } from '../services/host.service';

// Async thunk: Lấy thông tin Host theo accountId
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

const hostSlice = createSlice({
  name: 'host',
  initialState: {
    host: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearHost: (state) => {
      state.host = null;
      state.loading = false;
      state.error = null;
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
  },
});

export const { clearHost } = hostSlice.actions;

export default hostSlice.reducer;
