// components/TabSelector.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TabSelector = ({ activeTab, onTabChange, tabs }) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    gap: 30, 
    marginBottom: 10, 
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
    alignSelf: 'flex-start'
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, 
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
    flex: 1,
    minWidth: '40%',
    marginRight: 8,
    
  },
  activeTab: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500', // từ filterButtonText
    color: '#495057', // từ filterButtonText
  },
  activeTabText: {
    color: '#fff',
  },
});

export default TabSelector;