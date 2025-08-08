import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadHomestayImage,
  selectIsUploadingImage,
  selectImageUploadProgress,
  selectImageUploadError,
  selectImageUploadSuccess,
  clearImageUploadState,
  deleteHomestayMedia,
  selectIsDeleting,
  selectDeleteError,
  selectUploadedImages // ← Thêm selector
} from '../redux/slices/upload.slice';
import { MaterialIcons } from '@expo/vector-icons';

export default function UploadImage({ homestayId, homestay }) {
  const dispatch = useDispatch();

  // State upload
  const isUploading = useSelector(selectIsUploadingImage);
  const uploadProgress = useSelector(selectImageUploadProgress);
  const uploadError = useSelector(selectImageUploadError);
  const uploadSuccess = useSelector(selectImageUploadSuccess);
  const isDeleting = useSelector(selectIsDeleting);
  const deleteError = useSelector(selectDeleteError);

  // Lấy danh sách ảnh đã upload từ Redux
  const uploadedImagesFromStore = useSelector(selectUploadedImages);

  // Danh sách ảnh hiện tại: kết hợp ảnh từ homestay + ảnh mới upload
  const [allImages, setAllImages] = useState([]);

  // Ảnh mới chọn để preview
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUris, setPreviewUris] = useState([]);

  // Cập nhật danh sách ảnh khi có thay đổi từ props hoặc Redux
  useEffect(() => {
    const initialImages = Array.isArray(homestay?.imageList) ? homestay.imageList : [];
    const combined = [...new Set([...initialImages, ...uploadedImagesFromStore])]; // loại trùng
    setAllImages(combined);
  }, [homestay?.imageList, uploadedImagesFromStore]);

  // Yêu cầu quyền truy cập thư viện ảnh
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Lỗi', 'Cần quyền truy cập thư viện ảnh');
      return false;
    }
    return true;
  };

  // Chọn ảnh từ thư viện
  const pickImages = async () => {
    const granted = await requestPermission();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const assets = result.assets || [result];
      const files = assets.map(asset => ({
        uri: asset.uri,
        name: asset.fileName || `image_${Date.now()}.jpg`,
        type: 'image/jpeg'
      }));

      setSelectedFiles(prev => [...prev, ...files]);
      setPreviewUris(prev => [...prev, ...files.map(file => file.uri)]);
    }
  };

  // Xóa ảnh đã chọn (chưa upload)
  const removePreviewFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUris = previewUris.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUris(newUris);
  };

  // Xóa ảnh đã tồn tại (trên server)
  const removeExistingImage = async (imageUrl) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa ảnh này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteHomestayMedia({ fileUrl: imageUrl })).unwrap();
              // Xóa thành công → cập nhật state
              setAllImages(prev => prev.filter(url => url !== imageUrl));
              Alert.alert('Thành công', 'Ảnh đã được xóa khỏi server');
            } catch (error) {
              Alert.alert('Lỗi', error.message || 'Xóa ảnh thất bại');
            }
          }
        }
      ]
    );
  };

  // Upload ảnh lên server
  const handleUpload = async () => {
    if (!homestayId || selectedFiles.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh để tải lên');
      return;
    }

    try {
      const result = await dispatch(uploadHomestayImage({
        homestayId,
        imageFiles: selectedFiles
      })).unwrap();

      // ✅ Lấy URL từ result.data (trả về từ action.payload.data)
      const uploadedUrls = Array.isArray(result.data) ? result.data : [result.data];

      // Cập nhật danh sách ảnh
      setAllImages(prev => [...new Set([...prev, ...uploadedUrls])]);

      // Reset danh sách tạm
      setSelectedFiles([]);
      setPreviewUris([]);

      Alert.alert('Thành công', 'Tải ảnh lên thành công!');
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Lỗi', error.message || 'Tải ảnh lên thất bại');
    }
  };

  // Dọn dẹp khi component unmount
  useEffect(() => {
    return () => {
      dispatch(clearImageUploadState());
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ảnh</Text>

      {/* Ảnh đã có (cũ + đã upload) */}
      {allImages.length > 0 && (
        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Ảnh</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allImages.map((imageUrl, index) => (
              <View key={`existing-${index}`} style={styles.imageWrapper}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeExistingImage(imageUrl)}
                  disabled={isUploading || isDeleting}
                >
                  <MaterialIcons name="close" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.imageCount}>{allImages.length} ảnh</Text>
        </View>
      )}

      {/* Preview ảnh mới chọn */}
      {previewUris.length > 0 && (
        <View style={styles.imageSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {previewUris.map((uri, index) => (
              <View key={`preview-${index}`} style={styles.imageWrapper}>
                <Image source={{ uri }} style={styles.image} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePreviewFile(index)}
                  disabled={isUploading}
                >
                  <MaterialIcons name="close" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.imageCount}>Preview {previewUris.length} ảnh</Text>
        </View>
      )}

      {/* Trạng thái trống */}
      {allImages.length === 0 && previewUris.length === 0 && (
        <View style={styles.emptyState}>
          <MaterialIcons name="image" size={48} color="#9CA3AF" />
          <Text style={styles.emptyText}>Chưa có ảnh nào</Text>
        </View>
      )}

      {/* Thanh tiến trình upload */}
      {isUploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.progressText}>
            Đang tải lên... {uploadProgress ? `${uploadProgress}%` : ''}
          </Text>
        </View>
      )}

      {/* Thông báo lỗi upload */}
      {uploadError && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={16} color="#EF4444" />
          <Text style={styles.errorText}>{uploadError}</Text>
        </View>
      )}

      {/* Thông báo thành công */}
      {uploadSuccess && (
        <View style={styles.successContainer}>
          <MaterialIcons name="check-circle" size={16} color="#10B981" />
          <Text style={styles.successText}>Tải ảnh thành công</Text>
        </View>
      )}

      {/* Lỗi xóa */}
      {deleteError && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={16} color="#EF4444" />
          <Text style={styles.errorText}>{deleteError}</Text>
        </View>
      )}

      {/* Nút hành động */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={pickImages}
          style={[styles.button, styles.selectButton]}
          disabled={isUploading}
        >
          <MaterialIcons name="photo-library" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Chọn ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUpload}
          disabled={isUploading || selectedFiles.length === 0 || !homestayId}
          style={[
            styles.button,
            styles.uploadButton,
            (isUploading || selectedFiles.length === 0 || !homestayId) && styles.disabledButton
          ]}
        >
          <MaterialIcons name="cloud-upload" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>
            {isUploading ? 'Đang tải...' : 'Tải lên'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// (Giữ nguyên phần StyleSheet)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  imageSection: {
    marginBottom: 16,
  },
  imageWrapper: {
    marginRight: 8,
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imageCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
  },
  successText: {
    color: '#10B981',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectButton: {
    backgroundColor: '#007AFF',
  },
  uploadButton: {
    backgroundColor: '#10B981',
  },
  disabledButton: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
});