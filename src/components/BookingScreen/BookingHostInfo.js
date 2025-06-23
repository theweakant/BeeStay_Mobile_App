import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';

const BookingHostInfo = ({ host }) => (
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

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

    hostContainer: {
    gap: 6,
  },
  hostName: {
    fontSize: 14,
    color: '#333',
  },
  hostEmail: {
    fontSize: 14,
    color: '#333',
  },
  hostPhone: {
    fontSize: 14,
    color: '#333',
  },
  hostRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostRatingText: {
    fontSize: 14,
    color: '#333',
  },
  hostRatingValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },

});
