import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StatsSection = ({ profileData }) => {
  return (
    <View style={styles.statsContainer}>
      <StatItem value={profileData.rating} label="Đánh giá" />
      <View style={styles.statDivider} />
      <StatItem value={profileData.totalProperties} label="Homestay" />
      <View style={styles.statDivider} />
      <StatItem value={profileData.totalBookings} label="Lượt đặt" />
      <View style={styles.statDivider} />
      <StatItem value={`${profileData.responseRate}%`} label="Phản hồi" />
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e9ecef',
  },
});

export default StatsSection;