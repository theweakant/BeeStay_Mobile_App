// redux/services/upload.service.js
import apiClient from '../../api/client';
import { HomestayEndpoints } from '../../api/endpoint';

export const uploadImageByHomestayId = async (homestayId, imageFiles) => {
  try {
    const formData = new FormData();
    
    // Thêm các file ảnh vào FormData
    if (Array.isArray(imageFiles)) {
      imageFiles.forEach((file, index) => {
        formData.append('image', file);
      });
    } else {
      formData.append('image', imageFiles);
    }

    const response = await apiClient.put(
      HomestayEndpoints.addStayCationImage(homestayId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("🔴 uploadImageByHomestayId API error:", error);
    throw error;
  }
};