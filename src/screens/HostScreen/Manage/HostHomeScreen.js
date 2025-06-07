import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostByAccount, clearHost } from '../../../redux/slices/host.slice';
import Header from '../../../components/HostHomeScreen/Header';
import Stats from '../../../components/HostHomeScreen/Stats';
import Dashboard from '../../../components/HostHomeScreen/Dashboard';
import Schedule from '../../../components/HostHomeScreen/Schedule';
import Section from '../../../components/HostHomeScreen/Section';
import { DashboardStats, DashboardItems, DashboardSchedule } from '../../../data/MockData';

const HostHomeScreen = () => {
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { user } = useSelector(state => state.auth); // Adjust based on your auth structure
  const { host, loading, error } = useSelector(state => state.host);
  const accountId = user?.id || user?.accountId;

  // Fetch host data on component mount
  useEffect(() => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }

    // Cleanup function to clear host data when component unmounts (optional)
    return () => {
      // dispatch(clearHost()); // Uncomment if you want to clear data on unmount
    };
  }, [dispatch, accountId]);

  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }
  };

  // Loading state
  if (loading && !host) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  // Error state
  if (error && !host) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {typeof error === 'string' ? error : 'Không thể tải thông tin host'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // No data state
  if (!host) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy thông tin host</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Loading overlay when refreshing */}
      {loading && host && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      )}

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header host={host} />

        <Section title="Tổng Quan Hôm Nay">
          <Stats stats={DashboardStats} />
        </Section>

        <Section title="Quản Lý Nhanh">
          <Dashboard items={DashboardItems} />
        </Section>

        <Section title="Lịch Hôm Nay">
          <Schedule schedule={DashboardSchedule} />
        </Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HostHomeScreen;