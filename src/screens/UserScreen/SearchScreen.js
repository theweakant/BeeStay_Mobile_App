import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ItemList from '../../components/ItemList';

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
      image:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    },
    {
      id: 2,
      name: 'HUTECH HOMESTAY',
      rating: 5.0,
      reviews: 48,
      price: '175.000đ',
      discount: '23%',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80',
    },
    {
      id: 3,
      name: 'UIT HOMESTAY',
      rating: 4.8,
      reviews: 34,
      price: '130.000đ',
      discount: '20%',
      image:
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1350&q=80',
    },
  ];

  // Handler functions
  const toggleHomestayStatus = (id) => {
    console.log('Toggle homestay status for id:', id);
    // Implement your toggle logic here
  };

  const viewDetails = (item) => {
    console.log('View details for:', item.name);
    // Implement navigation to details screen
  };

  const formatCurrency = (price) => {
    // Simple currency formatting - you can customize this
    return price;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

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

        {/* Use ItemList component correctly */}
        <ItemList
          homestays={homestays}
          toggleHomestayStatus={toggleHomestayStatus}
          viewDetails={viewDetails}
          formatCurrency={formatCurrency}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    flex: 1, // Add this to allow ItemList to expand
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
});