

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions
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
  clearVideoUploadState
} from '../redux/slices/upload.slice';

const { width } = Dimensions.get('window');
console.log('All selectors:', {
  selectIsUploadingVideo,
  selectVideoUploadProgress,
  selectVideoUploadError,
  selectVideoUploadSuccess
});
export default function UploadVideo({ homestayId }) {
  const dispatch = useDispatch();

  const isUploading = useSelector(selectIsUploadingVideo);
  const uploadProgress = useSelector(selectVideoUploadProgress);
  const uploadError = useSelector(selectVideoUploadError);
  const uploadSuccess = useSelector(selectVideoUploadSuccess);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUris, setPreviewUris] = useState([]);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Ứng dụng cần quyền truy cập thư viện để chọn video.'
      );
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
      quality: 1,
      videoMaxDuration: 300, // 5 phút
    });

    if (!result.canceled) {
      const assets = result.assets || [result];
      
      // Validate file size (100MB limit)
      const validAssets = [];
      for (const asset of assets) {
        if (asset.fileSize && asset.fileSize > 100 * 1024 * 1024) {
          Alert.alert(
            'File quá lớn',
            `Video ${asset.fileName || 'không tên'} vượt quá giới hạn 100MB`
          );
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
      setPreviewUris(prev => [...prev, ...files.map(file => ({
        uri: file.uri,
        name: file.name,
        duration: file.duration
      }))]);
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
      Alert.alert('Missing Data', 'Please select videos and provide homestay ID');
      return;
    }

    try {
      await dispatch(uploadHomestayVideo({
        homestayId,
        videoFiles: selectedFiles
      })).unwrap();
      
      // Clear after successful upload
      setSelectedFiles([]);
      setPreviewUris([]);
      
      Alert.alert('Success', 'Videos uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', error.message || 'Please try again');
    }
  };

  const handleClearState = () => {
    dispatch(clearVideoUploadState());
    setSelectedFiles([]);
    setPreviewUris([]);
  };

  const formatDuration = (duration) => {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderVideoItem = ({ item, index }) => (
    <View style={styles.videoWrapper}>
      <Video
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFile(index)}
        disabled={isUploading}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
      <View style={styles.videoInfo}>
        <Text style={styles.videoName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.videoDuration}>
          {formatDuration(item.duration)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Homestay Videos</Text>

      <TouchableOpacity
        onPress={pickVideos}
        style={[styles.button, styles.pickButton]}
        disabled={isUploading}
      >
        <Text style={styles.buttonText}>Select Videos</Text>
      </TouchableOpacity>

      {previewUris.length > 0 && (
        <FlatList
          data={previewUris}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderVideoItem}
          contentContainerStyle={styles.previewList}
          showsHorizontalScrollIndicator={false}
        />
      )}

      {isUploading && (
        <View style={styles.progressWrapper}>
          <ActivityIndicator size="small" color="#16a34a" />
          <Text style={styles.progressText}>Uploading... {uploadProgress}%</Text>
        </View>
      )}

      {uploadError && (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorText}>Error: {uploadError}</Text>
        </View>
      )}

      {uploadSuccess && (
        <View style={styles.successWrapper}>
          <Text style={styles.successText}>{uploadSuccess}</Text>
        </View>
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
            {isUploading ? 'Uploading...' : 'Upload Videos'}
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
        <Text style={styles.infoText}>
          Selected: {selectedFiles.length} video(s)
        </Text>
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
    backgroundColor: '#16a34a'
  },
  uploadButton: {
    backgroundColor: '#15803d',
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
    marginBottom: 16,
    paddingRight: 16
  },
  videoWrapper: {
    marginRight: 12,
    position: 'relative',
    width: width * 0.4,
  },
  video: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#000'
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
    justifyContent: 'center',
    zIndex: 1
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  videoInfo: {
    marginTop: 4,
    width: '100%'
  },
  videoName: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500'
  },
  videoDuration: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 6,
    borderLeft: 4,
    borderLeftColor: '#16a34a'
  },
  progressText: {
    marginLeft: 8,
    color: '#15803d',
    fontSize: 14,
    fontWeight: '500'
  },
  errorWrapper: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 6,
    borderLeft: 4,
    borderLeftColor: '#dc2626',
    marginBottom: 12
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14
  },
  successWrapper: {
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 6,
    borderLeft: 4,
    borderLeftColor: '#16a34a',
    marginBottom: 12
  },
  successText: {
    color: '#16a34a',
    fontSize: 14,
    fontWeight: '500'
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8
  },
  infoText: {
    marginTop: 12,
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});