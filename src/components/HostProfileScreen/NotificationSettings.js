// components/NotificationSettings.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export const NotificationSettings = ({ editedData, toggleNotification }) => {
  const notificationItems = [
    { key: 'bookings', title: 'Đặt phòng mới', desc: 'Thông báo khi có đặt phòng mới' },
    { key: 'messages', title: 'Tin nhắn', desc: 'Thông báo khi có tin nhắn mới' },
    { key: 'reviews', title: 'Đánh giá mới', desc: 'Thông báo khi có đánh giá mới' },
    { key: 'promotions', title: 'Khuyến mãi', desc: 'Thông báo về các chương trình khuyến mãi' }
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cài đặt thông báo</Text>
      
      {notificationItems.map((item, index) => (
        <View key={index} style={styles.notificationRow}>
          <View>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDesc}>{item.desc}</Text>
          </View>
          <Switch
            value={editedData.notifications[item.key]}
            onValueChange={() => toggleNotification(item.key)}
            trackColor={{ false: '#767577', true: '#FF6B35' }}
            thumbColor={editedData.notifications[item.key] ? '#fff' : '#f4f3f4'}
          />
        </View>
      ))}
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