// modals/LogoutConfirmModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const LogoutConfirmModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.confirmModalContent}>
          <Text style={styles.confirmTitle}>Đăng xuất</Text>
          <Text style={styles.confirmText}>Bạn có chắc chắn muốn đăng xuất?</Text>
          
          <View style={styles.confirmActions}>
            <TouchableOpacity 
              style={[styles.confirmButton, styles.confirmLogoutButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmLogoutText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={onClose}
            >
              <Text style={styles.confirmCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: width - 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
    confirmModalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: width - 80,
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  confirmLogoutButton: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  confirmLogoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmCancelText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },

})