import React from "react"
import { View, Text, StyleSheet } from "react-native"

const StatsCards = ({ activeCount, inactiveCount, totalRevenue, formatCurrency }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <Text style={styles.statLabel}>Hoạt động</Text>
          <View style={[styles.statDot, styles.activeDot]} />
        </View>
        <Text style={styles.statValue}>{activeCount}</Text>
      </View>

      <View style={styles.statCard}>
        <View style={styles.statHeader}>
          <Text style={styles.statLabel}>Tạm dừng</Text>
          <View style={[styles.statDot, styles.inactiveDot]} />
        </View>
        <Text style={styles.statValue}>{inactiveCount}</Text>
      </View>

      <View style={[styles.statCard, styles.revenueCard]}>
        <View style={styles.statHeader}>
          <Text style={styles.revenueLabel}>Doanh thu</Text>
        </View>
        <Text style={styles.revenueValue}>{formatCurrency(totalRevenue)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Stats Styles
  statsContainer: {
    flexDirection: "row",
    gap: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  revenueCard: {
    backgroundColor: "#FEF3C7",
    borderColor: "#F59E0B",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  revenueLabel: {
    fontSize: 12,
    color: "#92400E",
    fontWeight: "500",
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#10B981",
  },
  inactiveDot: {
    backgroundColor: "#EF4444",
  },
  revenueIcon: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "400",
    color: "#1E293B",
  },
  revenueValue: {
    fontSize: 12,
    fontWeight: "400",
    color: "#92400E",
  },
})

export default StatsCards