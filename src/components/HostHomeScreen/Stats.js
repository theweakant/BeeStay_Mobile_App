import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Stats = ({ stats }) => {
  return (
    <View style={styles.statsContainer}>
      {stats.map((item, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={[styles.statValue, { color: item.color }]}>
            {item.value}
          </Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Stats;
