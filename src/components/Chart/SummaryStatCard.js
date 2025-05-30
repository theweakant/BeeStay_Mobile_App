// components/SummaryCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../../utils/textUtils';
import StatCard from '../Card/StatCard'; 

const SummaryCard = ({ earningsData }) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Tổng thu nhập</Text>
        <Text style={styles.summaryValue}>{formatCurrency(earningsData.totalEarnings)}</Text>
        <Text style={styles.summaryChange}>+12.5% so với tháng trước</Text>
      </View>

      <View style={styles.summaryRow}>
        {/* ✅ Dùng StatCard */}
        <StatCard
          label="Tổng booking"
          value={earningsData.totalBookings}
          change="+8.2%"
        />

        <StatCard
          label="Booking sinh lời"
          value={earningsData.profitableBookings}
          change="87.1%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 15,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '600',
  },
});

export default SummaryCard;
