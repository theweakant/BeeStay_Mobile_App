import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Stats = ({ host }) => {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.sectionTitle}>Thống kê</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, styles.homestayNumber]}>{host?.homeStay?.length || 0}</Text>
          <Text style={styles.statLabel}>Homestay</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, styles.ratingNumber]}>{host?.averageHomestayRating?.toFixed(1) || '0.0'}</Text>
          <Text style={styles.statLabel}>Đánh giá TB</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // === MAIN CONTAINER ===
  statsSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },

  // === SECTION HEADER ===
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
    fontFamily: '-apple-system',
  },

  // === STATS GRID ===
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  // === STAT CARDS ===
  statCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },

  // === STAT NUMBERS ===
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: '-apple-system',
  },
  homestayNumber: {
    color: '#f97316', // Orange for homestay count
  },
  ratingNumber: {
    color: '#3b82f6', // Blue for rating
  },

  // === STAT LABELS ===
  statLabel: {
    fontSize: 12,
    color: '#4b5563',
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
  },
});