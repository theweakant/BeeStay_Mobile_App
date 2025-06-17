// redux/slices/homestaySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHomestays,
         getHomestayById,
         addStaycation,
         getHomestaysByHost,
         updateStaycation 
        }
from '../services/homestay.service';

//get all homestays
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

//get homestay by id
export const fetchHomestayById = createAsyncThunk(
  'homestay/fetchHomestayById',
  async (homeStayId, thunkAPI) => {
    try {
      const data = await getHomestayById(homeStayId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// add a new staycation by account ID
export const createStaycation = createAsyncThunk(
  'homestay/createStaycation',
  async ({ accountId, staycationData }, thunkAPI) => {
    try {
      const data = await addStaycation(accountId, staycationData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch homestays by host account ID
export const fetchHomestaysByHost = createAsyncThunk(
  'homestay/fetchHomestaysByHost',
  async (accountId, thunkAPI) => {
    try {
      const data = await getHomestaysByHost(accountId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update staycation by ID
export const updateStaycationById = createAsyncThunk(
  'homestay/updateStaycationById',
  async ({ homeStayId, staycationData }, thunkAPI) => {
    try {
      const data = await updateStaycation(homeStayId, staycationData);
      return { homeStayId, data }; 
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

    //state cho việc tạo staycation
    creating: false,
    createError: null,
    createSuccess: false,

    // State cho việc update staycation
    updating: false,
    updateError: null,
    updateSuccess: false,

    // State cho việc lấy homestay by ID
    fetchingById: false,
    fetchByIdError: null,

    // State cho việc lấy homestays by host
    hostHomestays: [],
    fetchingByHost: false,
    fetchByHostError: null,
    hostHomestaysCount: 0,
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
    // Clear host homestays
    clearHostHomestays: (state) => {
      state.hostHomestays = [];
      state.fetchingByHost = false;
      state.fetchByHostError = null;
      state.hostHomestaysCount = 0;
    },

    // Reset create state
    resetCreateState: (state) => {
      state.creating = false;
      state.createError = null;
      state.createSuccess = false;
    },

    // Reset update state
    resetUpdateState: (state) => {
      state.updating = false;
      state.updateError = null;
      state.updateSuccess = false;
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
      })

      // Create staycation
      .addCase(createStaycation.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createStaycation.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;
        // Thêm staycation mới vào danh sách (nếu cần)
        if (action.payload) {
          state.homestays.push(action.payload);
          state.totalCount += 1;
        }
      })
      .addCase(createStaycation.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
        state.createSuccess = false;
      })

      // Fetch homestay by ID
      .addCase(fetchHomestayById.pending, (state) => {
        state.fetchingById = true;
        state.fetchByIdError = null;
      })
      .addCase(fetchHomestayById.fulfilled, (state, action) => {
        state.fetchingById = false;
        state.selectedHomestay = action.payload;
      })
      .addCase(fetchHomestayById.rejected, (state, action) => {
        state.fetchingById = false;
        state.fetchByIdError = action.payload;
      })

      // Fetch homestays by host
      .addCase(fetchHomestaysByHost.pending, (state) => {
        state.fetchingByHost = true;
        state.fetchByHostError = null;
      })
      .addCase(fetchHomestaysByHost.fulfilled, (state, action) => {
        state.fetchingByHost = false;
        state.hostHomestays = action.payload;
        state.hostHomestaysCount = action.payload?.length || 0;
      })
      .addCase(fetchHomestaysByHost.rejected, (state, action) => {
        state.fetchingByHost = false;
        state.fetchByHostError = action.payload;
      })

      // Update staycation
      .addCase(updateStaycationById.pending, (state) => {
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateStaycationById.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        
        const { homeStayId, data } = action.payload;
        
        // Update selectedHomestay nếu đang xem chi tiết
        if (state.selectedHomestay && state.selectedHomestay.id === homeStayId) {
          state.selectedHomestay = data;
        }
        
        // Update trong danh sách homestays
        const index = state.homestays.findIndex(h => h.id === homeStayId);
        if (index !== -1) {
          state.homestays[index] = data;
        }
        
        // Update trong danh sách hostHomestays
        const hostIndex = state.hostHomestays.findIndex(h => h.id === homeStayId);
        if (hostIndex !== -1) {
          state.hostHomestays[hostIndex] = data;
        }
      })
      .addCase(updateStaycationById.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload;
        state.updateSuccess = false;
      });
  },
});

export const { 
  clearHomestays, 
  clearSelectedHomestay, 
  setSelectedHomestay, 
  filterHomestays,
  clearHostHomestays, 
  resetUpdateState
} = homestaySlice.actions;

export default homestaySlice.reducer;