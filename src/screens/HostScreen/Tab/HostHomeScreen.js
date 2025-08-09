import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardByHost, fetchBookingByHost, fetchHostByAccount } from '../../../redux/slices/host.slice';

// Import components
import Header from '../../../components/Host/HostHome/Header';
import Overview from '../../../components/Host/HostHome/Overview';
import Booking from '../../../components/Host/HostHome/Booking';
import TopHomestay from '../../../components/Host/HostHome/TopHomestay';

const HostHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { dashboard, dashboardLoading, dashboardError, bookings, bookingsLoading, host, loading: hostLoading } = useSelector((state) => state.host);

  const accountId = user?.id || user?.accountId;

  useEffect(() => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId)); 
      dispatch(fetchDashboardByHost(accountId)); 
      dispatch(fetchBookingByHost(accountId)); 
    }

    return () => {
      // dispatch(clearDashboard());
    };
  }, [dispatch, accountId]);

  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId)); 
      dispatch(fetchDashboardByHost(accountId)); 
      dispatch(fetchBookingByHost(accountId)); 
    }
  };

  // Loading state
  if (dashboardLoading && !dashboard) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  // Error state
  if (dashboardError && !dashboard) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {typeof dashboardError === 'string'
            ? dashboardError
            : 'Không thể tải dữ liệu dashboard'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!dashboard) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu dashboard</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {(dashboardLoading || bookingsLoading || hostLoading) && (dashboard || host) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Component */}
        <Header host={host} />

        {/* Overview Component */}
        <Overview dashboard={dashboard} />

        {/* Booking Component */}
        <Booking 
          bookings={bookings} 
          bookingsLoading={bookingsLoading} 
          navigation={navigation} 
        />

        {/* Top Homestay Component */}
        <TopHomestay 
          dashboard={dashboard} 
          navigation={navigation} 
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    paddingBottom: 30 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F8F9FA' 
  },
  loadingText: { 
    marginTop: 10, 
    fontSize: 16, 
    color: '#666' 
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 249, 250, 0.8)',
    zIndex: 1000,
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F8F9FA', 
    padding: 20 
  },
  errorText: { 
    fontSize: 16, 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  retryButton: { 
    backgroundColor: '#FF6B6B', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8 
  },
  retryButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

export default HostHomeScreen;