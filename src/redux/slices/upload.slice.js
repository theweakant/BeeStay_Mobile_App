// redux/slices/upload.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImageByHomestayId } from '../services/upload.service';

// Async thunk cho upload image
export const uploadHomestayImage = createAsyncThunk(
  'upload/uploadHomestayImage',
  async ({ homestayId, imageFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadImageByHomestayId(homestayId, imageFiles);
      return {
        homestayId,
        data: response
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Upload failed',
        status: error.response?.status
      });
    }
  }
);

const initialState = {
  isUploading: false,
  uploadProgress: 0,
  uploadedImages: [],
  error: null,
  successMessage: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    clearUploadState: (state) => {
      state.isUploading = false;
      state.uploadProgress = 0;
      state.error = null;
      state.successMessage = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload homestay image
      .addCase(uploadHomestayImage.pending, (state) => {
        state.isUploading = true;
        state.error = null;
        state.successMessage = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadHomestayImage.fulfilled, (state, action) => {
        state.isUploading = false;
        state.uploadProgress = 100;
        state.uploadedImages.push(action.payload.data);
        state.successMessage = 'Images uploaded successfully!';
        state.error = null;
      })
      .addCase(uploadHomestayImage.rejected, (state, action) => {
        state.isUploading = false;
        state.uploadProgress = 0;
        state.error = action.payload?.message || 'Upload failed';
        state.successMessage = null;
      });
  }
});

export const { 
  clearUploadState, 
  setUploadProgress, 
  clearUploadedImages 
} = uploadSlice.actions;

// Selectors
export const selectUploadState = (state) => state.upload;
export const selectIsUploading = (state) => state.upload.isUploading;
export const selectUploadProgress = (state) => state.upload.uploadProgress;
export const selectUploadedImages = (state) => state.upload.uploadedImages;
export const selectUploadError = (state) => state.upload.error;
export const selectUploadSuccess = (state) => state.upload.successMessage;

export default uploadSlice.reducer;