import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function SearchScreen() {
  // Sample data for homestays
  const homestays = [
    {
      id: 1,
      name: 'FPT HOMESTAY',
      rating: 5.0,
      reviews: 57,
      price: '150.000đ',
      discount: '25%',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
    },
    {
      id: 2,
      name: 'HUTECH HOMESTAY',
      rating: 5.0,
      reviews: 48,
      price: '175.000đ',
      discount: '23%',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80'
    },
    {
      id: 3,
      name: 'FPT HOMESTAY',
      rating: 5.0,
      reviews: 57,
      price: '150.000đ',
      discount: '25%',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Đề xuất</Text>
          <Text style={styles.headerSubtitle}>
            Đăng ký ngay để nhận nhiều ưu đãi hấp dẫn
          </Text>
          <TouchableOpacity>
            <Text style={styles.loginRegisterText}>Đăng nhập/ Đăng ký</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Section */}
        <View style={styles.nearbySection}>
          <Text style={styles.sectionTitle}>Gần bạn nhất</Text>
          <Text style={styles.sectionSubtitle}>
            Các homestay gần bạn có đánh giá tốt nhất
          </Text>

          {/* Homestay List */}
          <View style={styles.homestayList}>
            {homestays.map((homestay) => (
              <View key={homestay.id} style={styles.homestayCard}>
                <View style={styles.cardContent}>
                  {/* Homestay Image */}
                  <Image
                    source={{ uri: homestay.image }}
                    style={styles.homestayImage}
                  />

                  {/* Homestay Details */}
                  <View style={styles.homestayDetails}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>{homestay.rating}</Text>
                      <Text style={styles.reviewsText}>({homestay.reviews})</Text>
                      <Text style={styles.starIcon}>★</Text>
                    </View>
                    
                    <Text style={styles.homestayName}>{homestay.name}</Text>
                    
                    <Text style={styles.priceLabel}>Chỉ từ</Text>
                    <Text style={styles.priceText}>{homestay.price}</Text>
                    
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>Mã giảm {homestay.discount}</Text>
                    </View>
                  </View>
                </View>
                
                {/* Divider */}
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  loginRegisterText: {
    fontSize: 16,
    color: '#F5B041',
    fontWeight: '500',
  },
  nearbySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  homestayList: {
    marginTop: 8,
  },
  homestayCard: {
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  homestayImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  homestayDetails: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#999',
    marginRight: 4,
  },
  starIcon: {
    fontSize: 16,
    color: '#F5B041',
  },
  homestayName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  discountTag: {
    backgroundColor: '#FFEB3B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  discountText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
  },
});