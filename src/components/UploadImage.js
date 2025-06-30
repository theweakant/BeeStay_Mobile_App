import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity, 
  Image,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadHomestayImage,
  selectIsUploadingImage,
  selectImageUploadProgress,
  selectImageUploadError,
  selectImageUploadSuccess,
  clearImageUploadState
} from '../redux/slices/upload.slice';

export default function UploadImage({ homestayId }) {
  const dispatch = useDispatch();
  const isUploading = useSelector(selectIsUploadingImage);
  const uploadProgress = useSelector(selectImageUploadProgress);
  const uploadError = useSelector(selectImageUploadError);
  const uploadSuccess = useSelector(selectImageUploadSuccess);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUris, setPreviewUris] = useState([]);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Lỗi', 'Cần quyền truy cập thư viện ảnh');
      return false;
    }
    return true;
  };

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

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUris = previewUris.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUris(newUris);
  };

  const handleUpload = async () => {
    if (!homestayId || selectedFiles.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh');
      return;
    }

    try {
      await dispatch(uploadHomestayImage({
        homestayId,
        imageFiles: selectedFiles
      })).unwrap();
      
      setSelectedFiles([]);
      setPreviewUris([]);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleClear = () => {
    dispatch(clearImageUploadState());
    setSelectedFiles([]);
    setPreviewUris([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tải ảnh homestay</Text>
      
      {previewUris.length > 0 ? (
        <View style={styles.imageSection}>
          <FlatList
            data={previewUris}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(uri, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFile(index)}
                  disabled={isUploading}
                >
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.imageCount}>{previewUris.length} ảnh</Text>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Chưa chọn ảnh</Text>
        </View>
      )}

      {isUploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.progressText}>Đang tải... {uploadProgress}%</Text>
        </View>
      )}

      {uploadError && (
        <Text style={styles.errorText}>{uploadError}</Text>
      )}

      {uploadSuccess && (
        <Text style={styles.successText}>Tải thành công</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={pickImages}
          style={[styles.button, styles.selectButton]}
          disabled={isUploading}
        >
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
          <Text style={styles.buttonText}>
            {isUploading ? 'Đang tải...' : 'Tải lên'}
          </Text>
        </TouchableOpacity>
      </View>

      {selectedFiles.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>Xóa tất cả</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  imageSection: {
    marginBottom: 16,
  },
  imageWrapper: {
    marginRight: 8,
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
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
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  successText: {
    color: '#00aa44',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#007AFF',
  },
  uploadButton: {
    backgroundColor: '#34C759',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  clearButton: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 8,
  },
  clearText: {
    color: '#666',
    fontSize: 14,
  },
});