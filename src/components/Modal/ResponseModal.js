// components/ResponseModal.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import StarRating from '../Icon/StarRating';

const { width } = Dimensions.get('window');

export default function ResponseModal({ 
  visible, 
  review, 
  onClose, 
  onSave 
}) {
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    if (review) {
      setResponseText(review.response || '');
    }
  }, [review]);

  const handleSave = () => {
    if (responseText.trim()) {
      onSave(responseText);
      setResponseText('');
    }
  };

  if (!review) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.responseModalContent}>
          <Text style={styles.modalTitle}>
            {review.hasResponse ? 'Sửa phản hồi' : 'Trả lời đánh giá'}
          </Text>
          
          <View style={styles.reviewPreview}>
            <Text style={styles.previewGuestName}>{review.guestName}</Text>
            <View style={styles.previewRating}>
              <StarRating rating={review.rating} size={12} />
            </View>
            <Text style={styles.previewComment} numberOfLines={2}>
              {review.comment}
            </Text>
          </View>

          <TextInput
            style={styles.responseInput}
            placeholder="Nhập phản hồi của bạn..."
            value={responseText}
            onChangeText={setResponseText}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.responseActions}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Lưu phản hồi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseModalContent: {
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
  reviewPreview: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  previewGuestName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 5,
  },
  previewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  previewComment: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 18,
  },
  responseInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
  },
  responseActions: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});