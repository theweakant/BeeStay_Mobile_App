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
import { Ionicons } from '@expo/vector-icons';
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
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chi tiết đánh giá</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6c757d" />
              </TouchableOpacity>
            </View>
            
            {/* Guest Info */}
            <View style={styles.modalGuestInfo}>
              <Image source={{ uri: review.guestAvatar }} style={styles.modalGuestAvatar} />
              <View style={styles.guestDetails}>
                <View style={styles.guestNameRow}>
                  <Text style={styles.modalGuestName}>{review.guestName}</Text>
                  {review.verified && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={16} 
                      color="#28a745" 
                      style={styles.verifiedIcon}
                    />
                  )}
                </View>
                <Text style={styles.modalStayDates}>
                  {formatDate(review.checkInDate)} - {formatDate(review.checkOutDate)}
                </Text>
              </View>
            </View>

            {/* Rating */}
            <View style={styles.modalRating}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= review.rating ? "star" : "star-outline"}
                    size={18}
                    color={star <= review.rating ? "#FFD700" : "#E0E0E0"}
                  />
                ))}
              </View>
              <Text style={styles.modalRatingText}>{review.rating}/5</Text>
            </View>

            {/* Comment */}
            <Text style={styles.modalComment}>{review.comment}</Text>

            {/* Response Section */}
            {review.hasResponse && (
              <View style={styles.responseContainer}>
                <View style={styles.responseHeader}>
                  <Ionicons name="chatbubble-outline" size={16} color="#495057" />
                  <Text style={styles.responseTitle}>Phản hồi của bạn</Text>
                </View>
                <Text style={styles.responseText}>{review.response}</Text>
                <Text style={styles.responseDate}>
                  {formatDate(review.responseDate)}
                </Text>
              </View>
            )}

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  onClose();
                  onRespond(review);
                }}
              >
                <View style={styles.buttonContent}>
                  <Ionicons 
                    name={review.hasResponse ? "create-outline" : "chatbubble-outline"} 
                    size={14} 
                    color="#fff" 
                  />
                  <Text style={styles.modalButtonText}>
                    {review.hasResponse ? 'Sửa phản hồi' : 'Trả lời'}
                  </Text>
                </View>
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  closeButton: {
    padding: 4,
  },
  modalGuestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  modalGuestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  guestDetails: {
    flex: 1,
  },
  guestNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalGuestName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  modalStayDates: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  modalRatingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6c757d',
  },
  modalComment: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
    marginBottom: 12,
  },
  responseContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  responseTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
    marginLeft: 6,
  },
  responseText: {
    fontSize: 12,
    color: '#212529',
    lineHeight: 18,
    marginBottom: 8,
  },
  responseDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  modalActions: {
    marginTop: 8,
  },
  modalButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});