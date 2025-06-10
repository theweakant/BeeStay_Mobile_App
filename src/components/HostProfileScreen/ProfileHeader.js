
// components/ProfileHeader.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { getFullLocation, formatDate } from '../../utils/textUtils'; 

export const ProfileHeader = ({ profileData, isEditing, editedData, setEditedData, formatDate }) => {

  // Kiểm tra formatDate function
  const dateToFormat = profileData?.joinedDate || profileData?.joinDate;

  


  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ 
            uri: profileData?.avatar || 'https://via.placeholder.com/100x100/cccccc/ffffff?text=No+Image' 
          }} 
          style={styles.avatar} 
        />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Text style={styles.editAvatarIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={editedData?.name || ''}
            onChangeText={(text) => setEditedData({...editedData, name: text})}
            placeholder="Nhập tên của bạn"
          />
        ) : (
          <Text style={styles.name}>
            {(() => {
              console.log('Rendering name:', profileData?.name);
              return profileData?.name || 'Chưa có tên';
            })()}
          </Text>
        )}
        
        {/* DEBUG: Log location before rendering */}
        <Text style={styles.location}>
          {(() => {
            console.log('Rendering location:', profileData?.location);
            return profileData?.location ? getFullLocation(profileData.location) : 'Chưa cập nhật địa chỉ';
          })()}
        </Text>
        
        {/* DEBUG: Log date before rendering */}
        <Text style={styles.joinDate}>
          {(() => {
            console.log('Rendering joinDate:', profileData?.joinedDate || profileData?.joinDate);
            const dateToFormat = profileData?.joinedDate || profileData?.joinDate;
            return `Thành viên từ ${dateToFormat ? formatDate(dateToFormat) : 'Chưa xác định'}`;
          })()}
        </Text>
        
        {profileData?.superHost && (
          <View style={styles.superHostBadge}>
            <Text style={styles.superHostText}>⭐ Super Host</Text>
          </View>
        )}
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