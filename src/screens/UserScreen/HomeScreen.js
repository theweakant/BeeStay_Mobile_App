import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from '../../components/Card/InfoCard';
import SearchBar from '../../components/SearchBar';
import BannerCarousel from '../../components/BannerCarousel';
import TabSelector from '../../components/TabSelector';
import Loading from '../../components/StateScreen/Loading';
import Error from '../../components/StateScreen/Error';
import { fetchAllHomestays } from '../../redux/slices/homestay.slice';
import { useNavigation } from '@react-navigation/native';
import bannerData from '../../data/Data'

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { homestays, loading, error } = useSelector(state => state.homestay);
  
  const [flashSaleActiveTab, setFlashSaleActiveTab] = useState(0);
  const [availableActiveTab, setAvailableActiveTab] = useState(0);

  // Tab data
  const tabOptions = ['On Sale', 'Book Now'];

  // Fetch homestays when component mounts
  useEffect(() => {
    dispatch(fetchAllHomestays());
  }, [dispatch]);

  // Filter homestays based on properties
  const getFilteredHomestays = (filterType, tabIndex = 0) => {
    if (!homestays || homestays.length === 0) return [];

    switch (filterType) {
      case 'flashSale':
        if (tabIndex === 0) {
          return homestays.filter(item => item.flashSale);
        } else {
          return homestays.filter(item => item.instantBook);
        }
      
      case 'available':
        if (tabIndex === 0) {
          return homestays.filter(item => item.available && item.flashSale);
        } else {
          return homestays.filter(item => item.available && item.instantBook);
        }
      
      case 'new':
        return homestays.filter(item => item.available);
      
      case 'recommended':
        return homestays.filter(item => item.recommended);
      
      default:
        return homestays;
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

  // Handle banner press
  const handleBannerPress = (banner, index) => {
    console.log('Banner pressed:', banner.title, 'at index:', index);
    // Navigate based on banner link or show promotion detail
    if (banner.link) {
      // navigation.navigate('Promotion', { promotionId: banner.id });
      console.log('Navigate to:', banner.link);
    }
  };



  // Handle retry
  const handleRetry = () => {
    dispatch(fetchAllHomestays());
  };

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Loading />
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Error message={`Có lỗi xảy ra: ${error}`} />
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={handleRetry}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

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

        {/* Banner Carousel */}
        <BannerCarousel 
          banners={bannerData}
          onBannerPress={handleBannerPress}
          autoPlay={true}
          autoPlayInterval={4000}
          height={180}
          borderRadius={12}
          showDots={true}
          dotColor="#FF6B00"
          inactiveDotColor="#D1D5DB"
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

          {/* <TabSelector 
            tabs={tabOptions}
            activeTabIndex={availableActiveTab}
            onTabPress={handleAvailableTabPress}
          /> */}

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
              source={require('../../../assets/Banner/banner1.jpg')}
              style={styles.programImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.programCard}>
            <Image
              source={require('../../../assets/Banner/banner2.jpg')}
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
  retryButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;