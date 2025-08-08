import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {formatDateString} from '../../../../utils/textUtils'

export default function HomestayInfo({ homestay, formatCurrency }) {
  return (
    <View style={styles.infoContainer}>
      {/* Title + Rating */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{homestay.name}</Text>
        {homestay.averageRating > 0 && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {homestay.averageRating} ({homestay.reviewCount || 0})
            </Text>
          </View>
        )}
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={14} color="#666" />
        <Text style={styles.locationText}>
          {homestay.location?.address || 'Địa chỉ không có sẵn'}
        </Text>
      </View>

      {/* Distance to center */}
      {typeof homestay.distanceToCenter === 'number' && (
        <View style={styles.distanceContainer}>
          <Ionicons name="navigate-outline" size={14} color="#666" />
          <Text style={styles.distanceText}>
            Cách trung tâm {homestay.distanceToCenter} km
          </Text>
        </View>
      )}

      {/* Status Tags */}
      <View style={styles.tagsContainer}>
        {homestay.flashSale && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>Sale</Text>
          </View>
        )}
        {homestay.available && (
          <View style={[styles.tag, styles.availableTag]}>
            <Text style={[styles.tagText, styles.availableTagText]}>Available</Text>
          </View>
        )}
        {homestay.recommended && (
          <View style={[styles.tag, styles.recommendTag]}>
            <Text style={[styles.tagText, styles.recommendTagText]}>Recommended</Text>
          </View>
        )}
        {homestay.instantBook && (
          <View style={[styles.tag, styles.instantBookTag]}>
            <Text style={[styles.tagText, styles.instantBookTagText]}>Instant Book</Text>
          </View>
        )}
      </View>

      {/* Price Section */}
      <View style={styles.priceSection}>
        {homestay.discountPercentage > 0 && (
          <View style={styles.discountRow}>
            <Text style={styles.discountLabel}>Phần trăm giảm</Text>
            <Text style={styles.discountText}>-{homestay.discountPercentage}%</Text>
          </View>
        )}
        <View style={styles.currentPriceRow}>
          <Text style={styles.currentPriceLabel}>Giá đã giảm</Text>
          <Text style={styles.currentPrice}>
            {formatCurrency
              ? formatCurrency(homestay.pricePerNight)
              : `${homestay.pricePerNight?.toLocaleString() || '0'} đ`}
            <Text style={styles.priceUnit}>/đêm</Text>
          </Text>
        </View>
        {homestay.originalPricePerNight &&
          homestay.originalPricePerNight > homestay.pricePerNight && (
            <View style={styles.originalPriceRow}>
              <Text style={styles.originalPriceLabel}>Giá gốc</Text>
              <Text style={styles.originalPrice}>
                {formatCurrency
                  ? formatCurrency(homestay.originalPricePerNight)
                  : `${homestay.originalPricePerNight.toLocaleString()} đ`}/đêm
              </Text>
            </View>
          )}
      </View>

      {/* Available Dates */}
      {homestay.availableDates?.length > 0 && (
        <View style={styles.datesContainer}>
          <Text style={styles.currentPriceLabel}>Ngày còn trống:</Text>
          <Text style={styles.datesText}>
            {homestay.availableDates.map(formatDateString).join(' | ')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  distanceText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#FFE8E8',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  availableTag: {
    backgroundColor: '#FFF4E6',
  },
  availableTagText: {
    color: '#FF8C00',
  },
  recommendTag: {
    backgroundColor: '#E8F5E8',
  },
  recommendTagText: {
    color: '#4CAF50',
  },
  instantBookTag: {
    backgroundColor: '#E3F2FD',
  },
  instantBookTagText: {
    color: '#1976D2',
  },
  priceSection: {
    marginTop: 8,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  discountLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  discountText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  currentPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  currentPriceLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  currentPrice: {
    fontSize: 16,
    color: '#10B981',
  },
  priceUnit: {
    fontSize: 16,
    color: '#10B981',
  },
  originalPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  originalPriceLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
  },
  datesContainer: {
  flexDirection: 'column', // đổi từ row sang column
  marginTop: 6,
  },
  datesText: {
    fontSize: 16,
    color: '#10B981',
    marginLeft: 4,
    marginTop: 6,
    flex: 1,
  },
});
