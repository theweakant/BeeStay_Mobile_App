// modals/PaymentMethodModal.js
import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const PaymentMethodModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thêm phương thức thanh toán</Text>
          
          <View style={styles.modalSection}>
            <Text style={styles.modalLabel}>Loại tài khoản</Text>
            <View style={styles.paymentTypeButtons}>
              <TouchableOpacity style={[styles.paymentTypeButton, styles.activePaymentType]}>
                <Text style={styles.activePaymentTypeText}>Ngân hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentTypeButton}>
                <Text style={styles.paymentTypeText}>Thẻ tín dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.modalSection}>
            <Text style={styles.modalLabel}>Tên ngân hàng</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nhập tên ngân hàng"
            />
          </View>
          
          <View style={styles.modalSection}>
            <Text style={styles.modalLabel}>Số tài khoản</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nhập số tài khoản"
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.modalSection}>
            <Text style={styles.modalLabel}>Tên chủ tài khoản</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nhập tên chủ tài khoản"
            />
          </View>
          
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                Alert.alert('Thành công', 'Đã thêm phương thức thanh toán mới!');
                onClose();
              }}
            >
              <Text style={styles.modalButtonText}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalCancelText}>Hủy</Text>
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
    paymentTypeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  paymentTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
  },
  activePaymentType: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  paymentTypeText: {
    fontSize: 14,
    color: '#495057',
  },
    activePaymentTypeText: {
    color: '#fff',
    fontWeight: '600',
  },
    modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  modalCancelText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
});