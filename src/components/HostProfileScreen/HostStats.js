// components/HostStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HostStats = ({ profileData }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{profileData.rating}</Text>
        <Text style={styles.statLabel}>Đánh giá</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{profileData.totalProperties}</Text>
        <Text style={styles.statLabel}>Homestay</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{profileData.totalBookings}</Text>
        <Text style={styles.statLabel}>Lượt đặt</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{profileData.responseRate}%</Text>
        <Text style={styles.statLabel}>Phản hồi</Text>
      </View>
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

