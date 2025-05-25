import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabSelector = ({ 
  tabs = [],
  activeTabIndex = 0,
  onTabPress,
  containerStyle,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle
}) => {
  return (
    <View style={[styles.tabContainer, containerStyle]}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            tabStyle,
            activeTabIndex === index && styles.activeTab,
            activeTabIndex === index && activeTabStyle
          ]}
          onPress={() => onTabPress && onTabPress(index, tab)}
        >
          <Text
            style={[
              styles.tabText,
              textStyle,
              activeTabIndex === index && styles.activeTabText,
              activeTabIndex === index && activeTextStyle
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#FF6B00',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default TabSelector;