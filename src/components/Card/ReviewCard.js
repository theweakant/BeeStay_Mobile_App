// components/ReviewCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StarRating from '../Icon/StarRating';
import { formatDate } from '../../utils/textUtils';

export default function ReviewCard({ item, onPress, onRespond }) {
  return (
    <TouchableOpacity style={styles.reviewCard} onPress={() => onPress(item)}>
      <View style={styles.reviewHeader}>
        <View style={styles.guestInfo}>
          <Image source={{ uri: item.guestAvatar }} style={styles.guestAvatar} />
          <View style={styles.guestDetails}>
            <View style={styles.guestNameRow}>
              <Text style={styles.guestName}>{item.guestName}</Text>
              {item.verified && <Text style={styles.verifiedBadge}>✓</Text>}
            </View>
            <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          <StarRating rating={item.rating} showNumber />
        </View>
      </View>

      <View style={styles.homestayInfo}>
        <Image source={{ uri: item.homestayImage }} style={styles.homestayImage} />
        <Text style={styles.homestayName}>{item.homestayName}</Text>
      </View>

      <Text style={styles.reviewComment} numberOfLines={3}>
        {item.comment}
      </Text>

      <View style={styles.reviewFooter}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, 
            { backgroundColor: item.status === 'published' ? '#E8F5E8' : '#FFF3E0' }
          ]}>
            <Text style={[styles.statusText, 
              { color: item.status === 'published' ? '#2E7D32' : '#F57C00' }
            ]}>
              {item.status === 'published' ? 'Đã xuất bản' : 'Chờ duyệt'}
            </Text>
          </View>
          
          {!item.hasResponse && item.rating <= 3 && (
            <View style={styles.needResponseBadge}>
              <Text style={styles.needResponseText}>Cần phản hồi</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          {!item.hasResponse || item.rating <= 3 ? (
            <TouchableOpacity 
              style={styles.responseButton}
              onPress={() => onRespond(item)}
            >
              <Text style={styles.responseButtonText}>
                {item.hasResponse ? '✏️ Sửa phản hồi' : '💬 Trả lời'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.respondedIndicator}>
              <Text style={styles.respondedText}>✅ Đã trả lời</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  guestInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  guestAvatar: {
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
  guestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  verifiedBadge: {
    marginLeft: 6,
    color: '#28a745',
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  homestayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  homestayImage: {
    width: 30,
    height: 30,
    borderRadius: 6,
    marginRight: 10,
  },
  homestayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  reviewComment: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  needResponseBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  needResponseText: {
    fontSize: 12,
    color: '#F57C00',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  responseButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  responseButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  respondedIndicator: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  respondedText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
});