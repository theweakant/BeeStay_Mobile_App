import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationRow = ({ title, description, value, onToggle }) => (
  <View style={styles.notificationRow}>
    <View>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationDesc}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#767577', true: '#FF6B35' }}
      thumbColor={value ? '#fff' : '#f4f3f4'}
    />
  </View>
);

const NotificationSection = ({ editedData, onToggleNotification }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cài đặt thông báo</Text>
      
      <NotificationRow
        title="Đặt phòng mới"
        description="Thông báo khi có đặt phòng mới"
        value={editedData.notifications.bookings}
        onToggle={() => onToggleNotification('bookings')}
      />
      
      <NotificationRow
        title="Tin nhắn"
        description="Thông báo khi có tin nhắn mới"
        value={editedData.notifications.messages}
        onToggle={() => onToggleNotification('messages')}
      />
      
      <NotificationRow
        title="Đánh giá mới"
        description="Thông báo khi có đánh giá mới"
        value={editedData.notifications.reviews}
        onToggle={() => onToggleNotification('reviews')}
      />
      
      <NotificationRow
        title="Khuyến mãi"
        description="Thông báo về các chương trình khuyến mãi"
        value={editedData.notifications.promotions}
        onToggle={() => onToggleNotification('promotions')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  notificationDesc: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default NotificationSection;