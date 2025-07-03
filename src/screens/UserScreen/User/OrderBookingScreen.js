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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../../redux/hooks/useAuth';
import {
  fetchUserBooking,
  selectUserBooking,
  selectBookingLoading,
  selectBookingError
} from '../../../redux/slices/user.slice';

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
      return { status: 'upcoming', color: '#4a90e2', icon: 'time-outline', text: 'Sắp tới' };
    } else if (now >= checkInDate && now <= checkOutDate) {
      return { status: 'active', color: '#28a745', icon: 'checkmark-circle', text: 'Đang diễn ra' };
    } else {
      return { status: 'completed', color: '#6c757d', icon: 'checkmark-done', text: 'Hoàn thành' };
    }
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
          activeOpacity={0.7}
        >
          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: bookingStatus.color }]}>
            <Ionicons name={bookingStatus.icon} size={12} color="#fff" />
            <Text style={styles.statusText}>{bookingStatus.text}</Text>
          </View>

          {/* Main Content */}
          <View style={styles.cardHeader}>
            <View style={styles.homestayInfo}>
              <Ionicons name="home" size={24} color="#4a90e2" />
              <Text style={styles.homestayName} numberOfLines={2}>
                {item.homestay}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#adb5bd" />
          </View>

          {/* Guest Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={16} color="#6c757d" />
              <Text style={styles.infoText}>{item.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} color="#6c757d" />
              <Text style={styles.infoText}>{item.phoneNumber}</Text>
            </View>
          </View>

          {/* Date Range */}
          <View style={styles.dateSection}>
            <View style={styles.dateItem}>
              <Ionicons name="log-in" size={16} color="#28a745" />
              <View>
                <Text style={styles.dateLabel}>Nhận phòng</Text>
                <Text style={styles.dateValue}>{formatDate(item.checkIn)}</Text>
              </View>
            </View>
            <View style={styles.dateSeparator}>
              <Ionicons name="arrow-forward" size={16} color="#adb5bd" />
            </View>
            <View style={styles.dateItem}>
              <Ionicons name="log-out" size={16} color="#dc3545" />
              <View>
                <Text style={styles.dateLabel}>Trả phòng</Text>
                <Text style={styles.dateValue}>{formatDate(item.checkOut)}</Text>
              </View>
            </View>
          </View>

          {/* Payment & Price */}
          <View style={styles.bottomSection}>
            <View style={styles.paymentInfo}>
              <MaterialIcons name="payment" size={16} color="#ff9500" />
              <Text style={styles.paymentText}>{item.paymentMethod}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceValue}>
                {item.totalPrice.toLocaleString()} VND
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={80} color="#adb5bd" />
      <Text style={styles.emptyTitle}>Chưa có booking nào</Text>
      <Text style={styles.emptySubtitle}>
        Hãy khám phá và đặt homestay yêu thích của bạn
      </Text>
      <TouchableOpacity style={styles.exploreButton}>
        <Ionicons name="search" size={20} color="#fff" />
        <Text style={styles.exploreButtonText}>Khám phá ngay</Text>
      </TouchableOpacity>
    </View>
  );

  const ErrorState = () => (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle-outline" size={80} color="#dc3545" />
      <Text style={styles.errorTitle}>Oops! Có lỗi xảy ra</Text>
      <Text style={styles.errorSubtitle}>{error}</Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={() => accountId && dispatch(fetchUserBooking(accountId))}
      >
        <Ionicons name="refresh" size={20} color="#fff" />
        <Text style={styles.retryButtonText}>Thử lại</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Đang tải booking của bạn...</Text>
      </View>
    );
  }

  if (error && !bookings) {
    return <ErrorState />;
  }

  return (
    <View style={styles.container}>

      {/* Content */}
      {bookings && bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.bookingId.toString()}
          renderItem={({ item, index }) => <BookingCard item={item} index={index} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4a90e2']}
              tintColor="#4a90e2"
            />
          }
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  homestayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 40,
  },
  homestayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginLeft: 8,
    flex: 1,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 8,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginLeft: 8,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginLeft: 8,
  },
  dateSeparator: {
    paddingHorizontal: 12,
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
  paymentText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 6,
  },
  priceContainer: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 24,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});