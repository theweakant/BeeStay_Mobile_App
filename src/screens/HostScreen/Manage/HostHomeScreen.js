import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HostHomeScreen = () => {
  const navigation = useNavigation();
  const stats = [
    { label: 'Đánh giá TB', value: '4.2⭐', color: '#4CAF50' },
    { label: 'Doanh thu', value: '23M', color: '#2196F3' },
    { label: 'Tỉ lệ hủy', value: '4.8%', color: '#FF9800' },
  ];  

  const dashboardItems = [
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

  const todaySchedule = [
    { guestName: 'Thu Hà', time: '09:00', people: '5 người', status: 'check-in' },
    { guestName: 'Anh Thy', time: '14:30', people: '2 người', status: 'check-in' },
    { guestName: 'Minh Tuấn', time: '11:00', people: '3 người', status: 'check-out' },
  ];

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {stats.map((item, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={[styles.statValue, { color: item.color }]}>
            {item.value}
          </Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderDashboard = () => (
    <View style={styles.dashboardGrid}>
      {dashboardItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.dashboardItem, { backgroundColor: item.color }]}
          activeOpacity={0.7}
        >
          <View style={styles.dashboardHeader}>
            <Text style={styles.dashboardIcon}>{item.icon}</Text>
          </View>
          <Text style={[styles.dashboardItemTitle, { color: item.textColor }]}>
            {item.title}
          </Text>
          <Text style={styles.dashboardItemSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTodaySchedule = () => (
    <View style={styles.scheduleContainer}>
      {todaySchedule.map((item, index) => (
        <View 
          key={index} 
          style={[
            styles.scheduleItem,
            index === todaySchedule.length - 1 && styles.scheduleItemLast
          ]}
        >
          <View style={styles.scheduleTime}>
            <Text style={styles.timeText}>{item.time}</Text>
            <View style={[
              styles.statusDot,
              { backgroundColor: item.status === 'check-in' ? '#4CAF50' : '#FF9800' }
            ]} />
          </View>
          <View style={styles.scheduleContent}>
            <Text style={styles.guestName}>{item.guestName}</Text>
            <Text style={styles.peopleCount}>{item.people}</Text>
            <Text style={styles.statusText}>
              {item.status === 'check-in' ? 'Nhận phòng' : 'Trả phòng'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileInfo}>
              <Image 
                source={{ 
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' 
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>Chào bạn, Nam!</Text>
                <Text style={styles.profileSubtitle}>Quản lý Homestay Premium</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('HostNotification')}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng Quan Hôm Nay</Text>
          {renderStats()}
        </View>

        {/* Dashboard Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quản Lý Nhanh</Text>
          {renderDashboard()}
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lịch Hôm Nay</Text>
          {renderTodaySchedule()}
        </View>
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
  
  // Header styles
  header: {
    marginBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 3,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  
  // Section styles
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  
  // Stats styles
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Dashboard styles
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    width: '48%',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  dashboardHeader: {
    marginBottom: 12,
  },
  dashboardIcon: {
    fontSize: 28,
  },
  dashboardItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dashboardItemSubtitle: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  
  // Schedule styles
  scheduleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scheduleItemLast: {
    borderBottomWidth: 0,
  },
  scheduleTime: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scheduleContent: {
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  peopleCount: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default HostHomeScreen;