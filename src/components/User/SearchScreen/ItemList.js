import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import InfoCard from './InfoCard';

const { width } = Dimensions.get('window');

const NUM_COLUMNS = 2;
const GAP = 12; // Khoảng cách giữa 2 cột
const PARENT_PADDING = 20; // Padding từ component cha
const VERTICAL_GAP = 16; // Khoảng cách giữa các hàng

// Tính width chính xác: trừ padding từ cha và gap
const AVAILABLE_WIDTH = width - (PARENT_PADDING * 2);
const CARD_WIDTH = (AVAILABLE_WIDTH - GAP) / NUM_COLUMNS;

const ItemList = ({ homestays, viewDetails, toggleHomestayStatus, formatCurrency, loading, onRefresh }) => {
  const renderItem = ({ item, index }) => {
    const isLeftColumn = index % NUM_COLUMNS === 0;
    
    return (
      <View 
        style={[
          styles.itemWrapper,
          {
            width: CARD_WIDTH,
            marginRight: isLeftColumn ? GAP : 0,
            marginBottom: VERTICAL_GAP,
          }
        ]}
      >
        <InfoCard
          item={item}
          onPress={viewDetails}
          onFavoritePress={() => toggleHomestayStatus?.(item.id)}
          style={styles.card}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={homestays || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={loading || false}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: -20, // Âm để bù trừ padding của cha
  },
  flatListContent: {
    paddingVertical: 0,
    paddingHorizontal: 20, // Đặt lại padding
  },
  itemWrapper: {
    // Width và margin được set động trong renderItem
  },
  card: {
    width: '100%',
    flex: 1,
  },
});

export default ItemList;