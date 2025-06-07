// components/ActionButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ActionButtons = ({ 
  isEditing, 
  saveProfile, 
  setEditedData, 
  profileData, 
  setIsEditing, 
  setShowLogoutConfirm 
}) => {
  return (
    <View style={styles.actionButtons}>
      {isEditing ? (
        <>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={saveProfile}
          >
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => {
              setEditedData({...profileData});
              setIsEditing(false);
            }}
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
            <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
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
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    padding: 20,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
    saveButton: {
    backgroundColor: '#28a745',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
    editButton: {
    backgroundColor: '#FF6B35',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
    logoutButtonText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
});