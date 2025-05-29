import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ItemCard from '../components/ItemCard'

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2;

const ItemList = ({ homestays, toggleHomestayStatus, viewDetails, formatCurrency }) => {
  const rendeItem = ({ item, index }) => (
    <ItemCard
      item={item}
      index={index}
      toggleHomestayStatus={toggleHomestayStatus}
      viewDetails={viewDetails}
      formatCurrency={formatCurrency}
    />
  );

  return (
    <FlatList
      data={homestays}
      renderItem={rendeItem}
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
