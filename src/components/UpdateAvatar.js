import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAvatarByAccount } from '../redux/slices/user.slice';

const UpdateAvatar = ({ accountId, currentAvatar, onAvatarUpdated }) => {
    const dispatch = useDispatch();
    const { avatarUpdateLoading } = useSelector((state) => state.user);
    const [previewImage, setPreviewImage] = useState(null);

    const showImagePicker = () => {
        const options = {
            title: 'Chọn ảnh đại diện',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }

            if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi chọn ảnh');
                return;
            }

            if (response.assets && response.assets[0]) {
                const imageAsset = response.assets[0];
                console.log('Selected image:', imageAsset);
                
                // Show preview
                setPreviewImage(imageAsset.uri);
                
                // Show confirmation dialog
                Alert.alert(
                    'Xác nhận',
                    'Bạn có muốn cập nhật ảnh đại diện này không?',
                    [
                        {
                            text: 'Hủy',
                            style: 'cancel',
                            onPress: () => setPreviewImage(null)
                        },
                        {
                            text: 'Cập nhật',
                            onPress: () => handleUpdateAvatar(imageAsset)
                        }
                    ]
                );
            }
        });
    };

    const handleUpdateAvatar = async (imageAsset) => {
        try {
            // Convert image to base64 string for API
            const imageData = `data:${imageAsset.type};base64,${imageAsset.base64}`;
            
            // Dispatch update avatar action
            const result = await dispatch(updateUserAvatarByAccount({
                accountId: accountId,
                imageData: imageData
            })).unwrap();

            console.log('Avatar updated successfully:', result);
            
            // Call callback if provided
            if (onAvatarUpdated) {
                onAvatarUpdated(result.image);
            }

            setPreviewImage(null);
            Alert.alert('Thành công', 'Cập nhật ảnh đại diện thành công!');

        } catch (error) {
            console.error('Error updating avatar:', error);
            setPreviewImage(null);
            Alert.alert('Lỗi', error || 'Có lỗi xảy ra khi cập nhật ảnh đại diện');
        }
    };

    return (
        <View style={styles.container}>
            {previewImage && (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: previewImage }} style={styles.previewImage} />
                    <Text style={styles.previewText}>Xem trước ảnh đại diện mới</Text>
                </View>
            )}
            
            <TouchableOpacity 
                style={[styles.uploadButton, avatarUpdateLoading && styles.disabledButton]} 
                onPress={showImagePicker}
                disabled={avatarUpdateLoading}
            >
                {avatarUpdateLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text style={styles.buttonText}>Đang cập nhật...</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.buttonIcon}>📷</Text>
                        <Text style={styles.buttonText}>Cập nhật ảnh đại diện</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
    },
    previewContainer: {
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    previewImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    previewText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    uploadButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
});

export default UpdateAvatar;