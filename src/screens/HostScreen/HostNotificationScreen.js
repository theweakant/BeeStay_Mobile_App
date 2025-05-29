import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

export default function HostNotificationScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Đặt phòng thành công',
      message: 'Bạn đã đặt phòng FPT HOMESTAY thành công. Mã đặt phòng: #FPT001',
      time: '5 phút trước',
      type: 'booking',
      isRead: false,
      icon: '🏠',
    },
    {
      id: 2,
      title: 'Ưu đãi đặc biệt',
      message: 'Giảm 30% cho lần đặt phòng đầu tiên tại HUTECH HOMESTAY. Áp dụng đến 31/12',
      time: '2 giờ trước',
      type: 'promotion',
      isRead: false,
      icon: '🎉',
    },
    {
      id: 3,
      title: 'Nhắc nhở check-in',
      message: 'Còn 1 ngày nữa là đến ngày check-in tại UIT HOMESTAY. Chuẩn bị hành lý nhé!',
      time: '1 ngày trước',
      type: 'reminder',
      isRead: true,
      icon: '⏰',
    },
    {
      id: 4,
      title: 'Đánh giá homestay',
      message: 'Hãy chia sẻ trải nghiệm của bạn tại FPT HOMESTAY để giúp khách hàng khác',
      time: '2 ngày trước',
      type: 'review',
      isRead: true,
      icon: '⭐',
    },
    {
      id: 5,
      title: 'Thanh toán thành công',
      message: 'Thanh toán 150.000đ cho đặt phòng tại HUTECH HOMESTAY đã được xử lý thành công',
      time: '3 ngày trước',
      type: 'payment',
      isRead: true,
      icon: '💳',
    },
    {
      id: 6,
      title: 'Homestay mới gần bạn',
      message: 'Khám phá RMIT HOMESTAY mới mở cách bạn 2km với nhiều tiện ích hấp dẫn',
      time: '1 tuần trước',
      type: 'new_place',
      isRead: true,
      icon: '📍',
    },
    {
      id: 7,
      title: 'Hủy đặt phòng',
      message: 'Đặt phòng #UIT002 đã được hủy thành công. Tiền sẽ được hoàn lại trong 3-5 ngày',
      time: '1 tuần trước',
      type: 'cancellation',
      isRead: true,
      icon: '❌',
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking': return '#4CAF50';
      case 'promotion': return '#FF9800';
      case 'reminder': return '#2196F3';
      case 'review': return '#9C27B0';
      case 'payment': return '#00BCD4';
      case 'new_place': return '#FF5722';
      case 'cancellation': return '#F44336';
      default: return '#757575';
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        
        {!item.isRead && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllReadText}>Đánh dấu tất cả đã đọc</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <View style={styles.unreadCountContainer}>
          <Text style={styles.unreadCountText}>
            Bạn có {unreadCount} thông báo chưa đọc
          </Text>
        </View>
      )}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllReadText: {
    fontSize: 14,
    color: '#F5B041',
    fontWeight: '500',
  },
  unreadCountContainer: {
    backgroundColor: '#fff3cd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  unreadCountText: {
    fontSize: 14,
    color: '#856404',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  unreadItem: {
    backgroundColor: '#f8f9ff',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '700',
    color: '#000',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F5B041',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 68,
  },
});