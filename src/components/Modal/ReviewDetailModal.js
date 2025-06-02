// components/ReviewDetailModal.js
import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import StarRating from '../Icon/StarRating';
import { formatDate } from '../../utils/textUtils';

const { width } = Dimensions.get('window');

export default function ReviewDetailModal({ 
  visible, 
  review, 
  onClose, 
  onRespond 
}) {
  if (!review) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Chi tiết đánh giá</Text>
            
            <View style={styles.modalGuestInfo}>
              <Image source={{ uri: review.guestAvatar }} style={styles.modalGuestAvatar} />
              <View>
                <Text style={styles.modalGuestName}>{review.guestName}</Text>
                <Text style={styles.modalStayDates}>
                  {formatDate(review.checkInDate)} - {formatDate(review.checkOutDate)}
                </Text>
              </View>
            </View>

            <View style={styles.modalRating}>
              <StarRating rating={review.rating} size={16} />
              <Text style={styles.modalRatingText}>{review.rating}/5</Text>
            </View>

            <Text style={styles.modalComment}>{review.comment}</Text>

            {review.hasResponse && (
              <View style={styles.responseContainer}>
                <Text style={styles.responseTitle}>Phản hồi của bạn:</Text>
                <Text style={styles.responseText}>{review.response}</Text>
                <Text style={styles.responseDate}>
                  {formatDate(review.responseDate)}
                </Text>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  onClose();
                  onRespond(review);
                }}
              >
                <Text style={styles.modalButtonText}>
                  {review.hasResponse ? 'Sửa phản hồi' : 'Trả lời'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.closeButton]}
                onPress={onClose}
              >
                <Text style={[styles.modalButtonText, styles.closeButtonText]}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    width: width - 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalGuestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalGuestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  modalGuestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  modalStayDates: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalRatingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  modalComment: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 24,
    marginBottom: 20,
  },
  responseContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  responseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  responseText: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
    marginBottom: 8,
  },
  responseDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#6c757d',
  },
  closeButtonText: {
    color: '#fff',
  },
});