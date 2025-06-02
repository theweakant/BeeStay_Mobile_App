import React from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';

const ProfileHeader = ({ 
  profileData, 
  isEditing, 
  editedData, 
  onEditAvatar, 
  onNameChange,
  formatDate 
}) => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatarButton} onPress={onEditAvatar}>
          <Text style={styles.editAvatarIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={editedData.name}
            onChangeText={onNameChange}
          />
        ) : (
          <Text style={styles.name}>{profileData.name}</Text>
        )}
        <Text style={styles.location}>{profileData.location}</Text>
        <Text style={styles.joinDate}>Thành viên từ {formatDate(profileData.joinDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B35',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editAvatarIcon: {
    fontSize: 14,
    color: '#fff',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B35',
    paddingVertical: 4,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
});

export default ProfileHeader;