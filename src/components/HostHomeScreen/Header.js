import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ host }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: host.avatar }} style={styles.profileImage} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Chào bạn, {host.name.split(' ')[0]}!</Text>
            <Text style={styles.profileSubtitle}>Quản lý Homestay tại {host.location.city}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton} 
          onPress={() => navigation.navigate('HostNotification')}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
