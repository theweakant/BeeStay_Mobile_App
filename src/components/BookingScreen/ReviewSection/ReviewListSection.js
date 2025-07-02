import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ReviewListSection = ({ reviews, averageRating, reviewCount }) => {

  const renderItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FBBF24" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewDate}>{item.date}</Text>
    </View>
  );

  if (!reviews || reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Đánh giá</Text>
        <Text style={styles.noReviewsText}>Chưa có đánh giá nào cho homestay này.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Đánh giá ({reviewCount}) - Trung bình: {averageRating.toFixed(1)}
      </Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => `${item.userId}_${index}`}
        renderItem={renderItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ReviewListSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  noReviewsText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  reviewItem: {
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F59E0B',
  },
  reviewComment: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
});
