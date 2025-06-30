import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import InfoCard from '../Card/InfoCard'; 
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const ItemList = ({ homestays, viewDetails }) => {
  const renderItem = ({ item, index }) => (
    <InfoCard
      item={item}
      onPress={viewDetails} 
      style={{ width: CARD_WIDTH }} 
    />
  );

  return (
    <FlatList
      data={homestays}
      renderItem={renderItem} 
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.flatListContent}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
    />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    padding: 15,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ItemList;