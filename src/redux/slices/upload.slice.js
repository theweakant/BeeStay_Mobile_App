// redux/slices/upload.slice.js - Cập nhật slice để hỗ trợ video
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImageByHomestayId, uploadVideoByHomestayId } from '../services/upload.service';

// Async thunk cho upload image (giữ nguyên)
export const uploadHomestayImage = createAsyncThunk(
  'upload/uploadHomestayImage',
  async ({ homestayId, imageFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadImageByHomestayId(homestayId, imageFiles);
      return {
        homestayId,
        data: response,
        type: 'image'
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Image upload failed',
        status: error.response?.status
      });
    }
  }
);

// Async thunk cho upload video (mới)
export const uploadHomestayVideo = createAsyncThunk(
  'upload/uploadHomestayVideo',
  async ({ homestayId, videoFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadVideoByHomestayId(homestayId, videoFiles);
      return {
        homestayId,
        data: response,
        type: 'video'
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Video upload failed',
        status: error.response?.status
      });
    }
  }
);

const initialState = {
  // Image upload state
  isUploadingImage: false,
  imageUploadProgress: 0,
  uploadedImages: [],
  imageError: null,
  imageSuccessMessage: null,
  
  // Video upload state
  isUploadingVideo: false,
  videoUploadProgress: 0,
  uploadedVideos: [],
  videoError: null,
  videoSuccessMessage: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    // Clear all upload state
    clearAllUploadState: (state) => {
      state.isUploadingImage = false;
      state.imageUploadProgress = 0;
      state.imageError = null;
      state.imageSuccessMessage = null;
      state.isUploadingVideo = false;
      state.videoUploadProgress = 0;
      state.videoError = null;
      state.videoSuccessMessage = null;
    },
    
    // Clear image upload state
    clearImageUploadState: (state) => {
      state.isUploadingImage = false;
      state.imageUploadProgress = 0;
      state.imageError = null;
      state.imageSuccessMessage = null;
    },
    
    // Clear video upload state
    clearVideoUploadState: (state) => {
      state.isUploadingVideo = false;
      state.videoUploadProgress = 0;
      state.videoError = null;
      state.videoSuccessMessage = null;
    },
    
    // Set progress
    setImageUploadProgress: (state, action) => {
      state.imageUploadProgress = action.payload;
    },
    
    setVideoUploadProgress: (state, action) => {
      state.videoUploadProgress = action.payload;
    },
    
    // Clear uploaded files
    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    },
    
    clearUploadedVideos: (state) => {
      state.uploadedVideos = [];
    },
    
    // Clear all uploaded files
    clearAllUploadedFiles: (state) => {
      state.uploadedImages = [];
      state.uploadedVideos = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload homestay image
      .addCase(uploadHomestayImage.pending, (state) => {
        state.isUploadingImage = true;
        state.imageError = null;
        state.imageSuccessMessage = null;
        state.imageUploadProgress = 0;
      })
      .addCase(uploadHomestayImage.fulfilled, (state, action) => {
        state.isUploadingImage = false;
        state.imageUploadProgress = 100;
        state.uploadedImages.push(action.payload.data);
        state.imageSuccessMessage = 'Images uploaded successfully!';
        state.imageError = null;
      })
      .addCase(uploadHomestayImage.rejected, (state, action) => {
        state.isUploadingImage = false;
        state.imageUploadProgress = 0;
        state.imageError = action.payload?.message || 'Image upload failed';
        state.imageSuccessMessage = null;
      })
      
      // Upload homestay video
      .addCase(uploadHomestayVideo.pending, (state) => {
        state.isUploadingVideo = true;
        state.videoError = null;
        state.videoSuccessMessage = null;
        state.videoUploadProgress = 0;
      })
      .addCase(uploadHomestayVideo.fulfilled, (state, action) => {
        state.isUploadingVideo = false;
        state.videoUploadProgress = 100;
        state.uploadedVideos.push(action.payload.data);
        state.videoSuccessMessage = 'Videos uploaded successfully!';
        state.videoError = null;
      })
      .addCase(uploadHomestayVideo.rejected, (state, action) => {
        state.isUploadingVideo = false;
        state.videoUploadProgress = 0;
        state.videoError = action.payload?.message || 'Video upload failed';
        state.videoSuccessMessage = null;
      });
  }
});

export const { 
  clearAllUploadState,
  clearImageUploadState,
  clearVideoUploadState,
  setImageUploadProgress,
  setVideoUploadProgress,
  clearUploadedImages,
  clearUploadedVideos,
  clearAllUploadedFiles
} = uploadSlice.actions;

// Selectors for Image
export const selectImageUploadState = (state) => ({
  isUploading: state.upload.isUploadingImage,
  progress: state.upload.imageUploadProgress,
  error: state.upload.imageError,
  successMessage: state.upload.imageSuccessMessage,
  uploadedFiles: state.upload.uploadedImages
});

export const selectIsUploadingImage = (state) => state.upload.isUploadingImage;
export const selectImageUploadProgress = (state) => state.upload.imageUploadProgress;
export const selectUploadedImages = (state) => state.upload.uploadedImages;
export const selectImageUploadError = (state) => state.upload.imageError;
export const selectImageUploadSuccess = (state) => state.upload.imageSuccessMessage;

// Selectors for Video
export const selectVideoUploadState = (state) => ({
  isUploading: state.upload.isUploadingVideo,
  progress: state.upload.videoUploadProgress,
  error: state.upload.videoError,
  successMessage: state.upload.videoSuccessMessage,
  uploadedFiles: state.upload.uploadedVideos
});

export const selectIsUploadingVideo = (state) => state.upload.isUploadingVideo;
export const selectVideoUploadProgress = (state) => state.upload.videoUploadProgress;
export const selectUploadedVideos = (state) => state.upload.uploadedVideos;
export const selectVideoUploadError = (state) => state.upload.videoError;
export const selectVideoUploadSuccess = (state) => state.upload.videoSuccessMessage;


export const selectAllUploadState = (state) => ({
  image: selectImageUploadState(state),
  video: selectVideoUploadState(state)
});

export default uploadSlice.reducer;