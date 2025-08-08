// redux/slices/upload.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  uploadImageByHomestayId,
  uploadVideoByHomestayId,
  deleteMediaFile
} from '../services/upload.service';

// Upload image
export const uploadHomestayImage = createAsyncThunk(
  'upload/uploadHomestayImage',
  async ({ homestayId, imageFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadImageByHomestayId(homestayId, imageFiles);
      return { homestayId, data: response, type: 'image' };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Image upload failed',
        status: error.response?.status
      });
    }
  }
);

// Upload video
export const uploadHomestayVideo = createAsyncThunk(
  'upload/uploadHomestayVideo',
  async ({ homestayId, videoFiles }, { rejectWithValue }) => {
    try {
      const response = await uploadVideoByHomestayId(homestayId, videoFiles);
      return { homestayId, data: response, type: 'video' };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Video upload failed',
        status: error.response?.status
      });
    }
  }
);

// Delete media (image or video)
export const deleteHomestayMedia = createAsyncThunk(
  'upload/deleteHomestayMedia',
  async ({ fileUrl }, { rejectWithValue }) => {
    try {
      const response = await deleteMediaFile(fileUrl);
      return { fileUrl, response };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Delete media failed',
        status: error.response?.status
      });
    }
  }
);

const initialState = {
  isUploadingImage: false,
  imageUploadProgress: 0,
  uploadedImages: [],
  imageError: null,
  imageSuccessMessage: null,

  isUploadingVideo: false,
  videoUploadProgress: 0,
  uploadedVideos: [],
  videoError: null,
  videoSuccessMessage: null,

  deleteError: null,
  isDeleting: false
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    clearAllUploadState: (state) => {
      state.isUploadingImage = false;
      state.imageUploadProgress = 0;
      state.imageError = null;
      state.imageSuccessMessage = null;

      state.isUploadingVideo = false;
      state.videoUploadProgress = 0;
      state.videoError = null;
      state.videoSuccessMessage = null;

      state.isDeleting = false;
      state.deleteError = null;
    },

    clearImageUploadState: (state) => {
      state.isUploadingImage = false;
      state.imageUploadProgress = 0;
      state.imageError = null;
      state.imageSuccessMessage = null;
    },

    clearVideoUploadState: (state) => {
      state.isUploadingVideo = false;
      state.videoUploadProgress = 0;
      state.videoError = null;
      state.videoSuccessMessage = null;
    },

    setImageUploadProgress: (state, action) => {
      state.imageUploadProgress = action.payload;
    },

    setVideoUploadProgress: (state, action) => {
      state.videoUploadProgress = action.payload;
    },

    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    },

    clearUploadedVideos: (state) => {
      state.uploadedVideos = [];
    },

    clearAllUploadedFiles: (state) => {
      state.uploadedImages = [];
      state.uploadedVideos = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload image
      .addCase(uploadHomestayImage.pending, (state) => {
        state.isUploadingImage = true;
        state.imageUploadProgress = 0;
        state.imageError = null;
        state.imageSuccessMessage = null;
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
        state.imageError = action.payload?.message;
        state.imageSuccessMessage = null;
      })

      // Upload video
      .addCase(uploadHomestayVideo.pending, (state) => {
        state.isUploadingVideo = true;
        state.videoUploadProgress = 0;
        state.videoError = null;
        state.videoSuccessMessage = null;
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
        state.videoError = action.payload?.message;
        state.videoSuccessMessage = null;
      })

      // Delete media
      .addCase(deleteHomestayMedia.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteHomestayMedia.fulfilled, (state, action) => {
        state.isDeleting = false;
        const fileUrl = action.payload.fileUrl;
        state.uploadedImages = state.uploadedImages.filter((url) => url !== fileUrl);
        state.uploadedVideos = state.uploadedVideos.filter((url) => url !== fileUrl);
      })
      .addCase(deleteHomestayMedia.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload?.message;
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

// Selectors
export const selectImageUploadState = (state) => ({
  isUploading: state.upload.isUploadingImage,
  progress: state.upload.imageUploadProgress,
  error: state.upload.imageError,
  successMessage: state.upload.imageSuccessMessage,
  uploadedFiles: state.upload.uploadedImages
});

export const selectVideoUploadState = (state) => ({
  isUploading: state.upload.isUploadingVideo,
  progress: state.upload.videoUploadProgress,
  error: state.upload.videoError,
  successMessage: state.upload.videoSuccessMessage,
  uploadedFiles: state.upload.uploadedVideos
});

export const selectIsUploadingImage = (state) => state.upload.isUploadingImage;
export const selectIsUploadingVideo = (state) => state.upload.isUploadingVideo;
export const selectImageUploadProgress = (state) => state.upload.imageUploadProgress;
export const selectVideoUploadProgress = (state) => state.upload.videoUploadProgress;
export const selectUploadedImages = (state) => state.upload.uploadedImages;
export const selectUploadedVideos = (state) => state.upload.uploadedVideos;
export const selectImageUploadError = (state) => state.upload.imageError;
export const selectVideoUploadError = (state) => state.upload.videoError;
export const selectImageUploadSuccess = (state) => state.upload.imageSuccessMessage;
export const selectVideoUploadSuccess = (state) => state.upload.videoSuccessMessage;

//delete
export const selectIsDeleting = (state) => state.upload.isDeleting;
export const selectDeleteError = (state) => state.upload.deleteError;

export const selectAllUploadState = (state) => ({
  image: selectImageUploadState(state),
  video: selectVideoUploadState(state)
});

export default uploadSlice.reducer;
