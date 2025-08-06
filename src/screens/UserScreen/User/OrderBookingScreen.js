import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../redux/hooks/useAuth';
import {
  fetchUserBooking,
  selectUserBooking,
  selectBookingLoading,
  selectBookingError
} from '../../../redux/slices/user.slice';
import {formatCurrency} from '../../../utils/textUtils'

const { width } = Dimensions.get('window');

export default function OrderBookingScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useAuth();
  const accountId = user?.accountId;
  
  const bookings = useSelector(selectUserBooking);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  
  const [refreshing, setRefreshing] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const [activeTab, setActiveTab] = useState('Tất cả');

  const tabs = ['Tất cả', 'Đang diễn ra', 'Sắp tới'];

  useEffect(() => {
    if (accountId) {
      dispatch(fetchUserBooking(accountId));
    }
  }, [accountId, dispatch]);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [bookings]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (accountId) {
      await dispatch(fetchUserBooking(accountId));
    }
    setRefreshing(false);
  };

  const handleBookingPress = (bookingId) => {
    navigation.navigate('BookingDetail', { bookingId });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    if (diffDays === -1) return 'Hôm qua';
    if (diffDays > 1 && diffDays <= 7) return `${diffDays} ngày nữa`;
    if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getBookingStatus = (checkIn, checkOut) => {
    const now = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (now < checkInDate) {
      return { status: 'upcoming', color: '#FFA500', text: 'Sắp tới' };
    } else if (now >= checkInDate && now <= checkOutDate) {
      return { status: 'active', color: '#4CAF50', text: 'Đang diễn ra' };
    } else {
      return { status: 'completed', color: '#9E9E9E', text: 'Hoàn thành' };
    }
  };

  // Filter bookings based on active tab
  const getFilteredBookings = () => {
    if (!bookings || activeTab === 'Tất cả') return bookings;
    
    return bookings.filter(booking => {
      const bookingStatus = getBookingStatus(booking.checkIn, booking.checkOut);
      
      if (activeTab === 'Đang diễn ra') {
        return bookingStatus.status === 'active';
      }
      if (activeTab === 'Sắp tới') {
        return bookingStatus.status === 'upcoming';
      }
      
      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  // Get count for each tab
  const getTabCount = (tabName) => {
    if (!bookings) return 0;
    
    if (tabName === 'Tất cả') return bookings.length;
    
    return bookings.filter(booking => {
      const bookingStatus = getBookingStatus(booking.checkIn, booking.checkOut);
      
      if (tabName === 'Đang diễn ra') {
        return bookingStatus.status === 'active';
      }
      if (tabName === 'Sắp tới') {
        return bookingStatus.status === 'upcoming';
      }
      
      return false;
    }).length;
  };

  const BookingCard = ({ item, index }) => {
    const bookingStatus = getBookingStatus(item.checkIn, item.checkOut);
    const cardAnimatedStyle = {
      opacity: animatedValue,
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[cardAnimatedStyle, { delay: index * 100 }]}>
        <TouchableOpacity
          style={styles.bookingCard}
          onPress={() => handleBookingPress(item.bookingId)}
          activeOpacity={0.8}
        >
          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: bookingStatus.color }]}>
            <Text style={styles.statusText}>{bookingStatus.text}</Text>
          </View>

          {/* Main Content */}
          <View style={styles.cardHeader}>
            <Text style={styles.homestayName} numberOfLines={2}>
              {item.homestay}
            </Text>
          </View>

          {/* Guest Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Họ tên:</Text>
              <Text style={styles.infoValue}>{item.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Điện thoại:</Text>
              <Text style={styles.infoValue}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Thanh toán:</Text>
              <Text style={styles.infoValue}>{item.paymentMethod}</Text>
            </View>
          </View>

          {/* Date Range */}
          <View style={styles.dateSection}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Nhận phòng</Text>
              <Text style={styles.dateValue}>{formatDate(item.checkIn)}</Text>
            </View>
            <View style={styles.dateSeparator}>
              <Text style={styles.separatorText}>→</Text>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Trả phòng</Text>
              <Text style={styles.dateValue}>{formatDate(item.checkOut)}</Text>
            </View>
          </View>

          {/* Payment & Price */}
          <View style={styles.bottomSection}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentLabel}>Mã đặt phòng</Text>
              <Text style={styles.paymentMethod}>#{item.bookingId}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceValue}>
                {formatCurrency(item.totalPrice)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📅</Text>
      <Text style={styles.emptyTitle}>
        {activeTab === 'Tất cả' ? 'Chưa có booking nào' : `Chưa có booking ${activeTab.toLowerCase()}`}
      </Text>
      <Text style={styles.emptySubtitle}>
        Hãy khám phá và đặt homestay yêu thích của bạn
      </Text>
      <TouchableOpacity style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>Khám phá ngay</Text>
      </TouchableOpacity>
    </View>
  );

  const ErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Oops! Có lỗi xảy ra</Text>
      <Text style={styles.errorSubtitle}>{error}</Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={() => accountId && dispatch(fetchUserBooking(accountId))}
      >
        <Text style={styles.retryButtonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Đang tải booking của bạn...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !bookings) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;
            const count = getTabCount(tab);
            
            const getTabColor = (tabName, isActive) => {
              if (!isActive) return '#F8F9FA';
              
              switch(tabName) {
                case 'Tất cả': return '#DDDDDD';
                case 'Đang diễn ra': return '#B1DD9E';
                case 'Sắp tới': return '#FAB972';
                default: return '#F8F9FA';
              }
            };
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  isActive && styles.activeTab,
                  { backgroundColor: getTabColor(tab, isActive) }
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.tabText,
                  isActive && styles.activeTabText
                ]}>
                  {tab}
                </Text>
                {count > 0 && (
                  <View style={[
                    styles.tabBadge,
                    isActive && styles.activeTabBadge
                  ]}>
                    <Text style={[
                      styles.tabBadgeText,
                      isActive && styles.activeTabBadgeText
                    ]}>
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      {filteredBookings && filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.bookingId.toString()}
          renderItem={({ item, index }) => <BookingCard item={item} index={index} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FFA500']}
              tintColor="#FFA500"
            />
          }
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  // Tab Styles
  tabContainer: {
    marginHorizontal: -20,
  },
  tabScrollContent: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 44,
  },
  activeTab: {
    borderColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#333333',
    fontWeight: '600',
  },
  tabBadge: {
    marginLeft: 8,
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 20,
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabBadgeText: {
    color: '#333333',
  },
  listContainer: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  statusBadge: {
    position: 'absolute',
    top: 20,
    right: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
    marginRight: 80,
  },
  homestayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  viewDetails: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,             
    borderColor: '#e1e1e1ff',          
  },
  dateColumn: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  dateSeparator: {
    paddingHorizontal: 16,
  },
  separatorText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFA500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minHeight: 44,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minHeight: 44,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});