import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Dashboard = ({ items }) => {
  return (
    <View style={styles.dashboardGrid}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.dashboardItem, { backgroundColor: item.color }]}
          activeOpacity={0.7}
        >
          <View style={styles.dashboardHeader}>
            <Text style={styles.dashboardIcon}>{item.icon}</Text>
          </View>
          <Text style={[styles.dashboardItemTitle, { color: item.textColor }]}>
            {item.title}
          </Text>
          <Text style={styles.dashboardItemSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    width: '48%',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  dashboardHeader: {
    marginBottom: 12,
  },
  dashboardIcon: {
    fontSize: 28,
  },
  dashboardItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dashboardItemSubtitle: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
});

export default Dashboard;
