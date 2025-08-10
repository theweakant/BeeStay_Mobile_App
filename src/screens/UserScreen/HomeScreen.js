import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../redux/hooks/useAuth';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from '../../components/Card/InfoCard';
import BannerCarousel from '../../components/BannerCarousel';
import Loading from '../../components/StateScreen/Loading';
import Error from '../../components/StateScreen/Error';
import { fetchAllHomestays } from '../../redux/slices/homestay.slice';
import { useNavigation } from '@react-navigation/native';
import bannerData from '../../data/Data'

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { homestays, loading, error } = useSelector(state => state.homestay);
   const { name } = useAuth();
  const [flashSaleActiveTab, setFlashSaleActiveTab] = useState(0);
  const [availableActiveTab, setAvailableActiveTab] = useState(0);

  // Refs for scrolling to sections
  const scrollViewRef = useRef(null);
  const flashSaleRef = useRef(null);
  const availableRef = useRef(null);
  const recommendedRef = useRef(null);

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

  // Function to scroll to specific section
  const scrollToSection = (ref) => {
    if (ref.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({
            y: y - 20, // Offset để không bị che bởi header
            animated: true
          });
        },
        () => {
          console.log('Failed to measure layout');
        }
      );
    }
  };

  // Handle card press
  const handleCardPress = (item) => {
    navigation.navigate('Booking', { homestayId: item.id });
  };

  // Handle banner press
  const handleBannerPress = (banner, index) => {
    console.log('Banner pressed:', banner.title, 'at index:', index);
    if (banner.link) {
      console.log('Navigate to:', banner.link);
    }
  };

  const handleViewAllPress = () => {
    navigation.navigate('Search');
  };

  // New header handlers
  const handleLocationPress = () => {
    console.log('Change location pressed');
    // navigation.navigate('LocationPicker');
  };

  const handleNotificationPress = () => {
    // console.log('Notifications pressed');
    navigation.navigate('OrderBooking');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  // Updated quick action handler
  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    
    switch(action) {
      case 'nearby':
        // Scroll to BeeStay Gợi Ý section
        scrollToSection(recommendedRef);
        break;
      case 'instant':
        // Scroll to Available section
        scrollToSection(availableRef);
        break;
      case 'deals':
        // Scroll to Flash Sale section
        scrollToSection(flashSaleRef);
        break;
      case 'all':
        // Navigate to search screen
        navigation.navigate('Search');
        break;
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
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Redesigned Header */}
        <View style={styles.header}>
          {/* Top Row: Greeting + Actions */}
          <View style={styles.headerTopRow}>
            <View style={styles.greetingSection}>
              <Text style={styles.greetingText}>Chào, {name}!</Text>
              <TouchableOpacity style={styles.locationContainer} onPress={handleLocationPress}>
                <Ionicons name="location-outline" size={16} color="#FF6B00" />
                <Text style={styles.locationText}>TP. Hồ Chí Minh</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.weatherContainer}>
                <Ionicons name="sunny-outline" size={18} color="#FF6B00" />
                <Text style={styles.weatherText}>28°C</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleNotificationPress}>
                <Ionicons name="notifications-outline" size={22} color="#333" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton} onPress={handleProfilePress}>
                <Image 
                  source={{ uri: 'https://i.pravatar.cc/40' }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => handleQuickAction('nearby')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="location" size={18} color="#FF6B00" />
              </View>
              <Text style={styles.quickActionText}>Gần tôi</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => handleQuickAction('instant')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="flash" size={18} color="#FF6B00" />
              </View>
              <Text style={styles.quickActionText}>Đặt nhanh</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => handleQuickAction('deals')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="pricetag" size={18} color="#FF6B00" />
              </View>
              <Text style={styles.quickActionText}>Ưu đãi</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => handleQuickAction('all')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="grid" size={18} color="#FF6B00" />
              </View>
              <Text style={styles.quickActionText}>Tất cả</Text>
            </TouchableOpacity>
          </View>
        </View>

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
        <View style={styles.sectionContainer} ref={flashSaleRef}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <FontAwesome name="bolt" size={18} color="#FF6B00" />
              <Text style={styles.sectionTitle}>Flash Sale</Text>
            </View>
            <TouchableOpacity onPress={handleViewAllPress}>
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

        {/* BeeStay Recommendations Section */}
        <View style={styles.sectionContainer} ref={recommendedRef}>
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

        {/* New Homestays Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Homestay mới</Text>
            <TouchableOpacity onPress={handleViewAllPress}>
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
              source={require('../../../assets/Banner/BannerSale/7.png')}
              style={styles.programImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.programCard}>
            <Image
              source={require('../../../assets/Banner/BannerSale/3.png')}
              style={styles.programImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
                    <TouchableOpacity style={styles.programCard}>
            <Image
              source={require('../../../assets/Banner/BannerSale/1.png')}
              style={styles.programImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Available Section */}
        <View style={styles.sectionContainer} ref={availableRef}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Availables</Text>
            <TouchableOpacity onPress={handleViewAllPress}>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

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
  
  // Redesigned Header Styles
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#f8f8f8',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  greetingSection: {
    flex: 1,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: '500',
    marginHorizontal: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  weatherText: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: '500',
  },
  actionButton: {
    position: 'relative',
    padding: 4,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    backgroundColor: '#FF4444',
    borderRadius: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF6B00',
  },
  
  // Quick Actions
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Rest of the existing styles remain the same
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