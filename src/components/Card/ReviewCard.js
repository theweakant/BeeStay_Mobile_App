// components/ReviewCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
              {item.verified && (
                <Ionicons 
                  name="checkmark-circle" 
                  size={16} 
                  color="#28a745" 
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.ratingDisplay}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= item.rating ? "star" : "star-outline"}
                  size={16}
                  color={star <= item.rating ? "#FFD700" : "#E0E0E0"}
                />
              ))}
            </View>
          </View>
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
              <View style={styles.buttonContent}>
                <Ionicons 
                  name={item.hasResponse ? "create-outline" : "chatbubble-outline"} 
                  size={14} 
                  color="#fff" 
                />
                <Text style={styles.responseButtonText}>
                  {item.hasResponse ? 'Sửa phản hồi' : 'Trả lời'}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.respondedIndicator}>
              <View style={styles.buttonContent}>
                <Ionicons 
                  name="checkmark-done-circle" 
                  size={14} 
                  color="#2E7D32" 
                />
                <Text style={styles.respondedText}>Đã trả lời</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 20,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingDisplay: {
    alignItems: 'flex-end',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },

  homestayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 2,
  },
  homestayImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
  },
  homestayName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#495057',
  },
  reviewComment: {
    fontSize: 12,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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