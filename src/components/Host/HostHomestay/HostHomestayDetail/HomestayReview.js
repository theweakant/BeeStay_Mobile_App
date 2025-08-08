import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDateString } from '../../../../utils/textUtils';

const HomestayReview = ({ reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Chỉ hiển thị 3 review đầu tiên nếu chưa expand
  const displayReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  // Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={12}
          color={i <= rating ? "#FBBF24" : "#D1D5DB"}
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {item.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.nameRatingContainer}>
            <Text style={styles.reviewerName}>{item.name || 'Người dùng'}</Text>
            <View style={styles.starsContainer}>
              {renderStars(Math.floor(item.rating))}
            </View>
          </View>
        </View>
        <Text style={styles.reviewDate}>{formatDateString(item.date)}</Text>
      </View>

      <Text style={styles.reviewComment} numberOfLines={3}>
        {item.comment}
      </Text>
    </View>
  );

  if (!reviews || reviews.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Đánh giá khách hàng</Text>
          </View>
        </View>
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>Chưa có đánh giá nào</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Đánh giá khách hàng</Text>
        </View>
      </View>

      {/* Reviews List */}
      <View style={styles.reviewsList}>
        <FlatList
          data={displayReviews}
          keyExtractor={(item, index) => `${item.userId}_${index}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />

        {/* Show More/Less Button */}
        {reviews.length > 3 && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAllReviews(!showAllReviews)}
          >
            <Text style={styles.showMoreText}>
              {showAllReviews
                ? `Thu gọn`
                : `Xem thêm ${reviews.length - 3} đánh giá khác`
              }
            </Text>
            <Ionicons
              name={showAllReviews ? "chevron-up" : "chevron-down"}
              size={16}
              color="#8e8e8eff"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HomestayReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  reviewsList: {
    paddingHorizontal: 18,
  },
  reviewItem: {
    paddingTop: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9e456ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nameRatingContainer: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewComment: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#8e8e8eff',
    fontWeight: '400',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    gap: 6,
  },
  showMoreText: {
    fontSize: 12,
    color: '#8e8e8eff',
    fontWeight: '600',
  },
  noReviewsContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#8e8e8eff',
    fontWeight: '500',
    marginTop: 8,
  },
});
