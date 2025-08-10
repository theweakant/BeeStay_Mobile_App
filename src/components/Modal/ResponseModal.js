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
import { Ionicons } from '@expo/vector-icons';

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
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {review.hasResponse ? 'Sửa phản hồi' : 'Trả lời đánh giá'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6c757d" />
            </TouchableOpacity>
          </View>
          
          {/* Review Preview */}
          <View style={styles.reviewPreview}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewGuestName}>{review.guestName}</Text>
              <View style={styles.previewRating}>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= review.rating ? "star" : "star-outline"}
                      size={14}
                      color={star <= review.rating ? "#FFD700" : "#E0E0E0"}
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>{review.rating}/5</Text>
              </View>
            </View>
            <Text style={styles.previewComment} numberOfLines={2}>
              {review.comment}
            </Text>
          </View>

          {/* Response Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputHeader}>
              <Ionicons name="chatbubble-outline" size={16} color="#495057" />
              <Text style={styles.inputLabel}>Phản hồi của bạn</Text>
            </View>
            <TextInput
              style={styles.responseInput}
              placeholder="Nhập phản hồi của bạn..."
              placeholderTextColor="#6c757d"
              value={responseText}
              onChangeText={setResponseText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Actions */}
          <View style={styles.responseActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.saveButtonText}>Lưu phản hồi</Text>
              </View>
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  closeButton: {
    padding: 4,
  },
  reviewPreview: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewGuestName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  previewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6c757d',
  },
  previewComment: {
    fontSize: 12,
    color: '#495057',
    lineHeight: 18,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
    marginLeft: 6,
  },
  responseInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#212529',
    minHeight: 100,
    backgroundColor: 'transparent',
  },
  responseActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});