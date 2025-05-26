import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import InfoCard from '../../components/InfoCard';
import SearchBar from '../../components/SearchBar';
import Banner from '../../components/Banner';
import TabSelector from '../../components/TabSelector';
import { HomestayData} from '../../data/MockData'; 
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [flashSaleActiveTab, setFlashSaleActiveTab] = useState(0);
  const [availableActiveTab, setAvailableActiveTab] = useState(0);

  // Tab data
  const tabOptions = ['On Sale', 'Book Now'];

  // Filter homestays based on properties
  const getFilteredHomestays = (filterType, tabIndex = 0) => {
    switch (filterType) {
      case 'flashSale':
        if (tabIndex === 0) {
          // "On Sale" tab - show homestays that are on sale
          return HomestayData.filter(item => item.isOnSale);
        } else {
          // "Book Now" tab - show homestays that are instant book
          return HomestayData.filter(item => item.isInstantBook);
        }
      
      case 'available':
        if (tabIndex === 0) {
          // "On Sale" tab - show available homestays that are on sale
          return HomestayData.filter(item => item.isAvailable && item.isOnSale);
        } else {
          // "Book Now" tab - show available homestays for instant booking
          return HomestayData.filter(item => item.isAvailable && item.isInstantBook);
        }
      
      case 'new':
        // Show newest homestays (you can add a createdDate field and sort by it)
        // For now, just show available homestays
        return HomestayData.filter(item => item.isAvailable);
      
      case 'recommended':
        // Show recommended homestays
        return HomestayData.filter(item => item.isRecommended);
      
      default:
        return HomestayData;
    }
  };

  // Handle card press
  const handleCardPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  // Handle search
  const handleSearch = (text) => {
    console.log('Search text:', text);
    // Implement search logic here
  };

  // Handle promotion banner press
  const handlePromotionPress = () => {
    console.log('Promotion banner pressed');
    // Navigate to promotion detail or open link
  };

  // Handle tab press for Flash Sale
  const handleFlashSaleTabPress = (index, tab) => {
    setFlashSaleActiveTab(index);
    console.log('Flash Sale tab pressed:', tab);
  };

  // Handle tab press for Available section
  const handleAvailableTabPress = (index, tab) => {
    setAvailableActiveTab(index);
    console.log('Available tab pressed:', tab);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Khám phá staycation và ưu đãi tại</Text>
            <Text style={styles.locationText}>Nha Trang</Text>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar 
          onChangeText={handleSearch}
          placeholder="Tên homestay, hotel, quận/huyện"
        />

        {/* Promotion Banner */}
        <Banner 
          onPress={handlePromotionPress}
        />

        {/* Flash Sale Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <FontAwesome name="bolt" size={18} color="#FF6B00" />
              <Text style={styles.sectionTitle}>Flash Sale</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <TabSelector 
            tabs={tabOptions}
            activeTabIndex={flashSaleActiveTab}
            onTabPress={handleFlashSaleTabPress}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {getFilteredHomestays('flashSale', flashSaleActiveTab).map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
            ))}
          </ScrollView>
        </View>

        {/* Available Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Availables</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <TabSelector 
            tabs={tabOptions}
            activeTabIndex={availableActiveTab}
            onTabPress={handleAvailableTabPress}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {getFilteredHomestays('available', availableActiveTab).map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
            ))}
          </ScrollView>
        </View>

        {/* New Homestays Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Homestay mới</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {getFilteredHomestays('new').map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
            ))}
          </ScrollView>
        </View>

        {/* Hot Deal Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hot Deal</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            <TouchableOpacity style={styles.programCard}>
              <Image
                source={{ uri: 'https://cf.shopee.vn/file/sg-11134201-22110-7wjrxjpvgfkv5a' }}
                style={styles.programImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.programCard}>
              <Image
                source={{ uri: 'https://cf.shopee.vn/file/sg-11134201-22110-7wjrxjpvgfkv5a' }}
                style={styles.programImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* BeeStay Recommendations Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BeeStay Gợi Ý</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {getFilteredHomestays('recommended').map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  locationText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4B63A',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: '500',
  },
  horizontalScrollView: {
    paddingLeft: 20,
  },
  programCard: {
    width: 250,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  programImage: {
    width: '100%',
    height: 120,
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;