import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadHomestayVideo,
  selectIsUploadingVideo,
  selectVideoUploadProgress,
  selectVideoUploadError,
  selectVideoUploadSuccess,
  clearVideoUploadState,
  deleteHomestayMedia,
  selectIsDeleting,
  selectDeleteError,
  selectUploadedVideos
} from '../redux/slices/upload.slice';
import { MaterialIcons } from '@expo/vector-icons';

export default function UploadVideo({ homestayId, homestay }) {
  const dispatch = useDispatch();

  // Selectors
  const isUploading = useSelector(selectIsUploadingVideo);
  const uploadProgress = useSelector(selectVideoUploadProgress);
  const uploadError = useSelector(selectVideoUploadError);
  const uploadSuccess = useSelector(selectVideoUploadSuccess);
  const isDeleting = useSelector(selectIsDeleting);
  const deleteError = useSelector(selectDeleteError);
  const uploadedVideosFromStore = useSelector(selectUploadedVideos);

  // Danh sách video: kết hợp từ homestay + đã upload
  const [allVideos, setAllVideos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUris, setPreviewUris] = useState([]);

  // Cập nhật danh sách video
  useEffect(() => {
    const initialVideos = Array.isArray(homestay?.videoList) ? homestay.videoList : [];
    const combined = [...new Set([...initialVideos, ...uploadedVideosFromStore])];
    setAllVideos(combined);
  }, [homestay?.videoList, uploadedVideosFromStore]);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Lỗi', 'Cần quyền truy cập thư viện video');
      return false;
    }
    return true;
  };

  const pickVideos = async () => {
    const granted = await requestPermission();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.8,
      videoMaxDuration: 300, // 5 phút
    });

    if (!result.canceled) {
      const assets = result.assets || [result];
      const validAssets = [];

      for (const asset of assets) {
        if (asset.fileSize && asset.fileSize > 100 * 1024 * 1024) {
          Alert.alert('Lỗi', `Video "${asset.fileName}" quá lớn (tối đa 100MB)`);
          continue;
        }
        validAssets.push(asset);
      }

      const files = validAssets.map(asset => ({
        uri: asset.uri,
        name: asset.fileName || `video_${Date.now()}.mp4`,
        type: 'video/mp4',
        duration: asset.duration || 0
      }));

      setSelectedFiles(prev => [...prev, ...files]);
      setPreviewUris(prev => [
        ...prev,
        ...files.map(file => ({
          uri: file.uri,
          name: file.name,
          duration: file.duration
        }))
      ]);
    }
  };

  const removePreviewFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUris = previewUris.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUris(newUris);
  };

  const removeExistingVideo = async (videoUrl) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa video này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteHomestayMedia({ fileUrl: videoUrl })).unwrap();
              setAllVideos(prev => prev.filter(url => url !== videoUrl));
              Alert.alert('Thành công', 'Video đã được xóa');
            } catch (error) {
              Alert.alert('Lỗi', error.message || 'Xóa video thất bại');
            }
          }
        }
      ]
    );
  };

  const handleUpload = async () => {
    if (!homestayId || selectedFiles.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn video để tải lên');
      return;
    }

    try {
      const result = await dispatch(uploadHomestayVideo({
        homestayId,
        videoFiles: selectedFiles
      })).unwrap();

      const uploadedUrls = Array.isArray(result.data) ? result.data : [result.data];
      setAllVideos(prev => [...new Set([...prev, ...uploadedUrls])]);

      setSelectedFiles([]);
      setPreviewUris([]);
      Alert.alert('Thành công', 'Tải video lên thành công!');
    } catch (error) {
      console.error('Upload video failed:', error);
      Alert.alert('Lỗi', error.message || 'Tải video thất bại');
    }
  };

  // Dọn dẹp khi unmount
  useEffect(() => {
    return () => {
      dispatch(clearVideoUploadState());
    };
  }, [dispatch]);

  const formatDuration = (ms) => {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng video</Text>

      {/* Video đã có (cũ + mới upload) */}
      {allVideos.length > 0 && (
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>Video</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allVideos.map((videoUrl, index) => (
              <View key={`video-${index}`} style={styles.videoWrapper}>
                <Video
                  source={{ uri: videoUrl }}
                  style={styles.video}
                  resizeMode="cover"
                  shouldPlay={false}
                  useNativeControls
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeExistingVideo(videoUrl)}
                  disabled={isUploading || isDeleting}
                >
                  <MaterialIcons name="close" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.videoCount}>{allVideos.length} video</Text>
        </View>
      )}

      {/* Preview video mới chọn */}
      {previewUris.length > 0 && (
        <View style={styles.videoSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {previewUris.map((item, index) => (
              <View key={`preview-${index}`} style={styles.videoWrapper}>
                <Video
                  source={{ uri: item.uri }}
                  style={styles.video}
                  resizeMode="cover"
                  shouldPlay={false}
                  useNativeControls
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePreviewFile(index)}
                  disabled={isUploading}
                >
                  <MaterialIcons name="close" size={14} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.videoDuration}>
                  {formatDuration(item.duration)}
                </Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.videoCount}>Preview {previewUris.length} video</Text>
        </View>
      )}

      {/* Trạng thái trống */}
      {allVideos.length === 0 && previewUris.length === 0 && (
        <View style={styles.emptyState}>
          <MaterialIcons name="videocam" size={48} color="#9CA3AF" />
          <Text style={styles.emptyText}>Chưa có video nào</Text>
        </View>
      )}

      {/* Thanh tiến trình */}
      {isUploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.progressText}>
            Đang tải lên... {uploadProgress ? `${uploadProgress}%` : ''}
          </Text>
        </View>
      )}

      {/* Lỗi upload */}
      {uploadError && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={16} color="#EF4444" />
          <Text style={styles.errorText}>{uploadError}</Text>
        </View>
      )}

      {/* Thành công */}
      {uploadSuccess && (
        <View style={styles.successContainer}>
          <MaterialIcons name="check-circle" size={16} color="#10B981" />
          <Text style={styles.successText}>Tải thành công</Text>
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
          onPress={pickVideos}
          style={[styles.button, styles.selectButton]}
          disabled={isUploading}
        >
          <MaterialIcons name="video-library" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Chọn video</Text>
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

// Dùng chung style như UploadImage (đã đồng bộ)
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
  videoSection: {
    marginBottom: 16,
  },
  videoWrapper: {
    marginRight: 8,
    position: 'relative',
    width: 120,
  },
  video: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#000',
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
  videoDuration: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoCount: {
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