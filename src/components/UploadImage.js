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
        Alert.alert(
        'Permission Denied',
        'Ứng dụng cần quyền truy cập ảnh để chọn ảnh từ thư viện.'
        );
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
        quality: 1,
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
      Alert.alert('Missing Data', 'Please select images and provide homestay ID');
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

  const handleClearState = () => {
    dispatch(clearUploadState());
    setSelectedFiles([]);
    setPreviewUris([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Homestay Images</Text>

      <TouchableOpacity
        onPress={pickImages}
        style={[styles.button, styles.pickButton]}
        disabled={isUploading}
      >
        <Text style={styles.buttonText}>Select Images</Text>
      </TouchableOpacity>

      {previewUris.length > 0 && (
        <FlatList
          data={previewUris}
          horizontal
          keyExtractor={(uri, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFile(index)}
                disabled={isUploading}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.previewList}
        />
      )}

      {isUploading && (
        <View style={styles.progressWrapper}>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={styles.progressText}>Uploading... {uploadProgress}%</Text>
        </View>
      )}

      {uploadError && (
        <Text style={styles.errorText}>Error: {uploadError}</Text>
      )}

      {uploadSuccess && (
        <Text style={styles.successText}>{uploadSuccess}</Text>
      )}

      <View style={styles.actions}>
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
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClearState}
          disabled={isUploading}
          style={[styles.button, styles.clearButton, isUploading && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {selectedFiles.length > 0 && (
        <Text style={styles.infoText}>Selected: {selectedFiles.length} file(s)</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    elevation: 3
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2937'
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12
  },
  pickButton: {
    backgroundColor: '#3b82f6'
  },
  uploadButton: {
    backgroundColor: '#2563eb',
    flex: 1
  },
  clearButton: {
    backgroundColor: '#4b5563',
    flex: 1,
    marginLeft: 8
  },
  disabledButton: {
    opacity: 0.5
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500'
  },
  previewList: {
    marginBottom: 16
  },
  imageWrapper: {
    marginRight: 12,
    position: 'relative'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  progressText: {
    marginLeft: 8,
    color: '#4b5563',
    fontSize: 14
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 12
  },
  successText: {
    color: '#16a34a',
    marginBottom: 12
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8
  },
  infoText: {
    marginTop: 12,
    fontSize: 14,
    color: '#4b5563'
  }
});
