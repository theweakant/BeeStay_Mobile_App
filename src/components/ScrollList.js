// components/ScrollList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import VerticalItemCard from './Chart/VerticalItemCard';

const ScrollList = ({ 
  data, 
  title, 
  onHomestayPress, 
  showTitle = true,
  containerStyle 
}) => {
  const renderHomestayItem = ({ item }) => (
    <VerticalItemCard 
      item={item} 
      onPress={onHomestayPress}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {showTitle && title && (
        <Text style={styles.sectionTitle}>{title}</Text>
      )}
      <FlatList
        data={data}
        renderItem={renderHomestayItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
});

export default ScrollList;