import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {formatDateString} from '../../../utils/textUtils'

const ReviewListSection = ({ reviews, averageRating, reviewCount }) => {
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
          <Text style={styles.noReviewsSubText}>Hãy trở thành người đầu tiên đánh giá homestay này!</Text>
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
        
        <View style={styles.statsContainer}>
          <View style={styles.ratingOverview}>
            <View style={styles.ratingScore}>
              <Text style={styles.avgRatingText}>{averageRating?.toFixed(1) || '0.0'}</Text>
              <Ionicons name="star" size={16} color="#FBBF24" />
            </View>
            <Text style={styles.reviewCountText}>({reviewCount || 0} đánh giá)</Text>
          </View>
          
          {/* Rating bars */}
          <View style={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviews?.filter(r => Math.floor(r.rating) === star).length || 0;
              const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
              
              return (
                <View key={star} style={styles.ratingBar}>
                  <Text style={styles.starNumber}>{star}</Text>
                  <Ionicons name="star" size={10} color="#FBBF24" />
                  <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: `${percentage}%` }]} />
                  </View>
                  <Text style={styles.barCount}>{count}</Text>
                </View>
              );
            })}
          </View>
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

export default ReviewListSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  
  statsContainer: {
    gap: 12,
  },
  
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  ratingScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  avgRatingText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FBBF24',
  },
  
  reviewCountText: {
    fontSize: 14,
    color: '#8e8e8eff',
  },
  
  ratingBars: {
    gap: 4,
  },
  
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  starNumber: {
    fontSize: 12,
    color: '#8e8e8eff',
    width: 8,
  },
  
  barBackground: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  
  barFill: {
    height: '100%',
    backgroundColor: '#FBBF24',
    borderRadius: 2,
  },
  
  barCount: {
    fontSize: 12,
    color: '#8e8e8eff',
    width: 16,
    textAlign: 'right',
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
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  
  noReviewsText: {
    fontSize: 16,
    color: '#8e8e8eff',
    fontWeight: '500',
    marginTop: 8,
  },
  
  noReviewsSubText: {
    fontSize: 13,
    color: '#8e8e8eff',
    textAlign: 'center',
    marginTop: 4,
  },
});