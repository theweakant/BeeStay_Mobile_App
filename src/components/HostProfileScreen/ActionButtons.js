import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const ActionButtons = ({ 
  isEditing, 
  saveProfile, 
  cancelEdit,
  setEditedData, 
  profileData, 
  setIsEditing, 
  setShowLogoutConfirm,
  updateLoading = false
}) => {
  return (
    <View style={styles.actionButtons}>
      {isEditing ? (
        <>
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              styles.saveButton,
              updateLoading && styles.disabledButton
            ]}
            onPress={saveProfile}
            disabled={updateLoading}
          >
            {updateLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.saveButtonText}>Đang lưu...</Text>
              </View>
            ) : (
              <Text style={styles.saveButtonText}>Cập nhật</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              styles.cancelButton,
              updateLoading && styles.disabledButton
            ]}
            onPress={cancelEdit || (() => {
              // Fallback to old behavior if cancelEdit not provided
              if (profileData) {
                setEditedData({
                  name: profileData.name || '',
                  phone: profileData.phone || '',
                  bio: profileData.bio || '',
                  location: {
                    address: profileData.location?.address || '',
                    district: profileData.location?.district || '',
                    city: profileData.location?.city || '',
                    province: profileData.location?.province || '',
                  },
                  socialLinks: profileData.socialLinks || []
                });
              }
              setIsEditing(false);
            })}
            disabled={updateLoading}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Cập nhật</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]}
            onPress={() => setShowLogoutConfirm(true)}
          >
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // === MAIN CONTAINER ===
  actionButtons: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },

  // === BASE BUTTON STYLE ===
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // === SAVE BUTTON (Success Green) ===
  saveButton: {
    backgroundColor: '#10b981',
    shadowColor: 'rgba(16,185,129,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: '-apple-system',
  },
  
  // === CANCEL BUTTON (Muted) ===
  cancelButton: {
    backgroundColor: '#6b7280',
    shadowColor: 'rgba(107,114,128,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: '-apple-system',
  },
  
  // === EDIT BUTTON (Primary Orange) ===
  editButton: {
    backgroundColor: '#f97316',
    shadowColor: 'rgba(249,115,22,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: '-apple-system',
  },
  
  // === LOGOUT BUTTON (Secondary) ===
  logoutButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#f97316',
    shadowColor: 'rgba(249,115,22,0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: '-apple-system',
  },
  
  // === LOADING STATE ===
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  disabledButton: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }],
  },
});