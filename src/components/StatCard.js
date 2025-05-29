import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ label, value, change }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.change}>{change}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '600',
  },
});

export default StatCard;
