import React from 'react';
import { View, Text } from 'react-native';

const BookingHostInfo = ({ host, styles }) => (
  host && (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Thông tin chủ nhà</Text>
      <View style={styles.hostContainer}>
        {host.name && (
          <Text style={styles.hostName}>Tên: {host.name}</Text>
        )}
        {host.email && (
          <Text style={styles.hostEmail}>Email: {host.email}</Text>
        )}
        {host.phone && (
          <Text style={styles.hostPhone}>Điện thoại: {host.phone}</Text>
        )}
        <View style={styles.hostRatingContainer}>
          <Text style={styles.hostRatingText}>Đánh giá chủ nhà: </Text>
          <Text style={styles.hostRatingValue}>{host.rating || 0}/5</Text>
        </View>
      </View>
    </View>
  )
);

export default BookingHostInfo;
