// redux/slices/videoUpload.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadVideoByHomestayId } from '../services/upload.service';

export const uploadHomestayVideo = createAsyncThunk(
  'videoUpload/uploadHomestayVideo',
  async ({ homestayId, videoFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadVideoByHomestayId(homestayId, videoFiles);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Video upload failed');
    }
  }
);

const videoUploadSlice = createSlice({
  name: 'videoUpload',
  initialState: {
    isUploading: false,
    progress: 0,
    uploadedFiles: [],
    error: null,
    successMessage: null
  },
  reducers: {
    clearVideoUploadState: (state) => {
      state.isUploading = false;
      state.progress = 0;
      state.uploadedFiles = [];
      state.error = null;
      state.successMessage = null;
    },
    setVideoUploadProgress: (state, action) => {
      state.progress = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadHomestayVideo.pending, (state) => {
        state.isUploading = true;
        state.error = null;
        state.successMessage = null;
        state.progress = 0;
      })
      .addCase(uploadHomestayVideo.fulfilled, (state, action) => {
        state.isUploading = false;
        state.progress = 100;
        state.uploadedFiles.push(action.payload);
        state.successMessage = 'Videos uploaded successfully!';
      })
      .addCase(uploadHomestayVideo.rejected, (state, action) => {
        state.isUploading = false;
        state.progress = 0;
        state.error = action.payload;
      });
  }
});

export const {
  clearVideoUploadState,
  setVideoUploadProgress
} = videoUploadSlice.actions;

export const selectVideoUpload = (state) => state.videoUpload;

export default videoUploadSlice.reducer;
