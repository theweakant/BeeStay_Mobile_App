import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Section from '../../../components/HostHomeScreen/Section';
import { formatCurrency } from '../../../utils/textUtils';

const Overview = ({ dashboard }) => {
  if (!dashboard) return null;

  const stats = [
    {
      value: dashboard.totalCustomers,
      label: 'Khách hàng',
      borderColor: '#DBEAFE',
      textColor: '#1E40AF',
    },
    {
      value: dashboard.totalBookings,
      label: 'Đơn đặt',
      borderColor: '#DCFCE7',
      textColor: '#166534',
    },
    {
      value: formatCurrency(dashboard.revenue),
      label: 'Doanh thu',
      borderColor: '#FEF3C7',
      textColor: '#92400E',
    },
    {
      value: dashboard.totalHomestays,
      label: 'Homestay',
      borderColor: '#FCE7F3',
      textColor: '#BE185D',
    }
  ];

  return (
    <Section title="Tổng Quan">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.statsContainer}
      >
        {stats.map((stat, index) => (
          <View 
            key={index}
            style={[styles.statBox, { borderColor: stat.borderColor }]}
          >
            <View style={[styles.iconContainer, { backgroundColor: stat.iconColor }]} />
            <Text style={[styles.statValue, { color: stat.textColor }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </ScrollView>
    </Section>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginHorizontal: -4,
  },
  statsContainer: { 
    paddingHorizontal: 4,
    gap: 12,
  },
  statBox: {
    width: 120,
    backgroundColor: '#F9FAFB',
    borderWidth: 3,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 12,
    borderRadius: 6,
    marginBottom: 2,
  },
  statValue: { 
    fontSize: 16, 
    fontWeight: '700',
  },
  statLabel: { 
    fontSize: 14, 
    color: '#64748B',
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default Overview;