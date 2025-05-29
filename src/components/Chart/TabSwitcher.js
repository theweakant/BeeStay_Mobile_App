// components/HomestayTabs.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { homestayTabs } from '../../data/MockData';

const HomestayTabs = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.homestayTabs}>
      {homestayTabs.map((tab, index) => (
        <TouchableOpacity 
          key={index}
          style={[styles.homestayTab, activeTab === tab && styles.activeHomestayTab]}
          onPress={() => onTabChange(tab)}
        >
          <Text style={[styles.homestayTabText, activeTab === tab && styles.activeHomestayTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  homestayTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  homestayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeHomestayTab: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  homestayTabText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeHomestayTabText: {
    color: '#fff',
  },
});

export default HomestayTabs;