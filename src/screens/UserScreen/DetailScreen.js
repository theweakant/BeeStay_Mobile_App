import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomestayData } from '../../data/MockData'; // Đường dẫn tùy vào vị trí file

export default function DetailScreen() {
  const navigation = useNavigation();
  const homestay = HomestayData[0]; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Room Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: homestay.image }} 
            style={styles.roomImage}
            resizeMode="cover"
          />
        </View>

        {/* Room Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.roomType}>{homestay.name}</Text>
          <Text style={styles.amenities}>
            {homestay.features.join(' + ')}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{homestay.pricePerNight.toLocaleString()}đ</Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => navigation.navigate('Booking')} 
            >
              <Text style={styles.bookButtonText}>Đặt homestay</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.policyContainer}>
            <Text style={styles.policyText}>
              Đã có những thứ thiết yếu như: Dầu gội, sữa tắm, khăn tắm, nước uống, giấy vệ sinh, homestay đi kèm.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 28, 
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  dateInfo: {
    flex: 1,
  },
  dateType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  changeButton: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  timeSeparator: {
    paddingHorizontal: 8,
  },
  imageContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  roomImage: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  roomType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amenities: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  policyContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  policyText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});