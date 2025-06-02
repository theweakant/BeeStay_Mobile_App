// components/ReviewStatsCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReviewStatsCard({ stats }) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.total}</Text>
        <Text style={styles.statLabel}>Tổng đánh giá</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.average}</Text>
        <Text style={styles.statLabel}>Điểm trung bình</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.pending}</Text>
        <Text style={styles.statLabel}>Chờ duyệt</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.needResponse}</Text>
        <Text style={styles.statLabel}>Cần phản hồi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
});