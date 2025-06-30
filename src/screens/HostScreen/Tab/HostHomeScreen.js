import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostByAccount, clearHost } from '../../../redux/slices/host.slice';
import Header from '../../../components/HostHomeScreen/Header';
import Stats from '../../../components/HostHomeScreen/Stats';
import Dashboard from '../../../components/HostHomeScreen/Dashboard';
import Schedule from '../../../components/HostHomeScreen/Schedule';
import Section from '../../../components/HostHomeScreen/Section';

import { DashboardStats } from '../../../data/MockData';

const HostHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  
  // Get data from Redux store
  const { user } = useSelector(state => state.auth); 
  const { host, loading, error } = useSelector(state => state.host);
  const accountId = user?.id || user?.accountId;

  // Fetch host data on component mount
  useEffect(() => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }

    return () => {
      // dispatch(clearHost()); // Uncomment if you want to clear data on unmount
    };
  }, [dispatch, accountId]);

  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHostByAccount(accountId));
    }
  };




  const handleNavigateMyHostBooking = () => {
  navigation.navigate('HostBooking');
};


    const DashboardItems = [
      { 
        id: 1, 
        title: 'Quản Lý Phòng', 
        subtitle: '8 phòng đang đặt\n2 phòng cần bảo trì', 
        color: '#E3F2FD', 
        textColor: '#1976D2', 
        icon: '🏠' 
      },
      { 
        id: 2, 
        title: 'Khách Sắp Tới', 
        subtitle: '5 lượt check-in hôm nay', 
        color: '#F3E5F5', 
        textColor: '#7B1FA2', 
        icon: '👥' 
      },
      { 
        id: 3, 
        title: 'Đánh Giá', 
        subtitle: '5 đánh giá tốt\n2 đang chờ phản hồi', 
        color: '#E8F5E8', 
        textColor: '#388E3C', 
        icon: '⭐' 
      },
      { 
        id: 4, 
        title: 'Đơn Chờ Xử Lý', 
        subtitle: '2 đơn đặt chờ xác nhận', 
        color: '#FFF3E0', 
        textColor: '#F57C00', 
        icon: '📋' 
      },
    ];


      const DashboardSchedule = [
        { guestName: 'Thu Hà', time: '09:00', people: '5 người', status: 'check-in' },
        { guestName: 'Anh Thy', time: '14:30', people: '2 người', status: 'check-in' },
        { guestName: 'Minh Tuấn', time: '11:00', people: '3 người', status: 'check-out' },
      ];

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

        <Section
          title="Lịch Hôm Nay"
          rightComponent={
            <TouchableOpacity onPress={handleNavigateMyHostBooking}>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          }
        >
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
  addButtonContainer: {
    marginBottom: 20,
    alignItems: 'center',
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
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingTop: 50, // Account for status bar
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6B7280',
    fontWeight: '300',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  seeAllText: {
  color: '#1976D2', // Màu xanh hoặc màu chủ đạo của app
  fontSize: 14,
  fontWeight: '500',
},
});

export default HostHomeScreen;