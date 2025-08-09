import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { formatCurrency } from '../../../utils/textUtils';

const TopHomestay = ({ dashboard, navigation }) => {
  if (!dashboard?.topHomestays) return null;

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Homestays</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Homestays')}
        >
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContent}>
        {dashboard.topHomestays.map((item, index) => (
          <View key={item.id} style={styles.homestayCard}>
            {/* Ranking Badge */}
            <View style={styles.rankingBadge}>
              <Text style={styles.rankingNumber}>#{index + 1}</Text>
            </View>

            {/* Image Section */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.homestayImage}
                resizeMode="cover"
              />
            </View>

            {/* Info Section */}
            <View style={styles.homestayInfo}>
              <View style={styles.headerSection}>
                <Text style={styles.homestayName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.homestayPrice}>
                    {formatCurrency(item.pricePerNight)}
                  </Text>
                </View>
              </View>

              <View style={styles.locationSection}>
                <Text style={styles.homestayLocation} numberOfLines={1}>
                  {item.location.city}, {item.location.province}
                </Text>
              </View>

              <View style={styles.statsSection}>
                <View style={styles.bookingStats}>
                  <Text style={styles.bookingText}>
                    {item.totalBooking} lượt đặt
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',

  },
  viewAllText: {
    fontSize: 14,
    color: '#8c8c8cff',
    fontWeight: '400',
  },
  sectionContent: {
    gap: 16,
  },
  homestayCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  rankingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  rankingNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  imageContainer: {
    position: 'relative',
  },
  homestayImage: { 
    width: 120, 
    height: 120,
  },
  homestayInfo: { 
    flex: 1, 
    padding: 16,
    justifyContent: 'space-between',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  homestayName: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#0F172A',
    letterSpacing: -0.3,
    flex: 1,
    marginRight: 8,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  homestayPrice: { 
    fontSize: 15, 
    fontWeight: '500', 
    color: '#DC2626',
  },
  locationSection: {
    marginBottom: 12,
  },
  homestayLocation: { 
    fontSize: 13, 
    color: '#64748B',
    fontWeight: '400',
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  bookingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  bookingText: { 
    fontSize: 13, 
    color: '#166534',
    fontWeight: '300',
  },
});

export default TopHomestay;