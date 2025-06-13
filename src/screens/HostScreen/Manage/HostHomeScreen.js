import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHostByAccount, clearHost } from '../../../redux/slices/host.slice';
import Header from '../../../components/HostHomeScreen/Header';
import Stats from '../../../components/HostHomeScreen/Stats';
import Dashboard from '../../../components/HostHomeScreen/Dashboard';
import Schedule from '../../../components/HostHomeScreen/Schedule';
import Section from '../../../components/HostHomeScreen/Section';
import AddButton from '../../../components/Button/AddButton';
import AddStaycationForm from '../../../components/Form/AddStaycationForm';
import { DashboardStats, DashboardItems, DashboardSchedule } from '../../../data/MockData';

const HostHomeScreen = () => {
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  
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

  const handleAddHomestay = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
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

        {/* Add Homestay Button */}
        <View style={styles.addButtonContainer}>
          <AddButton onPress={handleAddHomestay} />
        </View>

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

      {/* Add Homestay Modal */}
      <Modal
        visible={showAddForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Thêm Homestay Mới</Text>
            <TouchableOpacity onPress={handleCloseForm} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <AddStaycationForm onSuccess={handleCloseForm} />
          </ScrollView>
        </View>
      </Modal>
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
});

export default HostHomeScreen;