// redux/slices/imageUpload.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImageByHomestayId } from '../services/upload.service';

export const uploadHomestayImage = createAsyncThunk(
  'imageUpload/uploadHomestayImage',
  async ({ homestayId, imageFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadImageByHomestayId(homestayId, imageFiles);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Image upload failed');
    }
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    isUploading: false,
    progress: 0,
    uploadedFiles: [],
    error: null,
    successMessage: null
  },
  reducers: {
    clearImageUploadState: (state) => {
      state.isUploading = false;
      state.progress = 0;
      state.uploadedFiles = [];
      state.error = null;
      state.successMessage = null;
    },
    setImageUploadProgress: (state, action) => {
      state.progress = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadHomestayImage.pending, (state) => {
        state.isUploading = true;
        state.error = null;
        state.successMessage = null;
        state.progress = 0;
      })
      .addCase(uploadHomestayImage.fulfilled, (state, action) => {
        state.isUploading = false;
        state.progress = 100;
        state.uploadedFiles.push(action.payload);
        state.successMessage = 'Images uploaded successfully!';
      })
      .addCase(uploadHomestayImage.rejected, (state, action) => {
        state.isUploading = false;
        state.progress = 0;
        state.error = action.payload;
      });
  }
});

export const {
  clearImageUploadState,
  setImageUploadProgress
} = imageUploadSlice.actions;

export const selectImageUpload = (state) => state.imageUpload;

export default imageUploadSlice.reducer;
