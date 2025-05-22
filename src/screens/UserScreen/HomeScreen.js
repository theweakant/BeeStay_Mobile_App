import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  // Sample data for homestays
  const flashSaleItems = [
    {
      id: 1,
      name: 'Quy Duong Rose',
      location: 'Vũng Tàu',
      rating: 2.5,
      price: '120.000đ',
      originalPrice: '180.000đ',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 2,
      name: 'Quoc Bao Love',
      location: 'TP.HCM',
      rating: 3.5,
      price: '80.000đ',
      originalPrice: '150.000đ',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 3,
      name: 'The 5',
      location: 'Hà Nội',
      rating: 4.5,
      price: '130.000đ',
      originalPrice: '200.000đ',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    }
  ];

  const newHomestays = [...flashSaleItems];
  const recommendedHomestays = [...flashSaleItems];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Khám phá staycation và ưu đãi tại</Text>
            <Text style={styles.locationText}>Nha Trang</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tên homestay, hotel, quận/huyện"
              placeholderTextColor="#999"
            />
          </View>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png' }}
            style={styles.logo}
          />
        </View>

        {/* Promotion Banner */}
        <TouchableOpacity style={styles.promotionBanner}>
          <Image
            source={{ uri: 'https://cf.shopee.vn/file/sg-11134201-22110-7wjrxjpvgfkv5a' }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Flash Sale Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <FontAwesome name="bolt" size={18} color="#FF6B00" />
              <Text style={styles.sectionTitle}>Flash Sale</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={styles.tabText}>Thời gian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Qua đêm</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {flashSaleItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.homestayCard}>
                <Image source={{ uri: item.image }} style={styles.homestayImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.homestayName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={12} color="#F5B041" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.locationText}> • {item.location}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offers Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ưu đãi đặc biệt</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={styles.tabText}>Thời gian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Qua đêm</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {flashSaleItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.homestayCard}>
                <Image source={{ uri: item.image }} style={styles.homestayImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.homestayName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={12} color="#F5B041" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.locationText}> • {item.location}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* New Homestays Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Homestay mới</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {newHomestays.map((item) => (
              <TouchableOpacity key={item.id} style={styles.homestayCard}>
                <Image source={{ uri: item.image }} style={styles.homestayImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.homestayName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={12} color="#F5B041" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.locationText}> • {item.location}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Attractive Programs Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chương Trình Hấp Dẫn</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            <TouchableOpacity style={styles.programCard}>
              <Image
                source={{ uri: 'https://cf.shopee.vn/file/sg-11134201-22110-7wjrxjpvgfkv5a' }}
                style={styles.programImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.programCard}>
              <Image
                source={{ uri: 'https://cf.shopee.vn/file/sg-11134201-22110-7wjrxjpvgfkv5a' }}
                style={styles.programImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* BeeStay Recommendations Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BeeStay gợi ý</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {recommendedHomestays.map((item) => (
              <TouchableOpacity key={item.id} style={styles.homestayCard}>
                <Image source={{ uri: item.image }} style={styles.homestayImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.homestayName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={12} color="#F5B041" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.locationText}> • {item.location}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 14,
    color: '#666',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  logo: {
    width: 32,
    height: 32,
  },
  promotionBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  viewAllText: {
    fontSize: 14,
    color: '#999',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#FFE9D6',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  horizontalScrollView: {
    paddingLeft: 16,
  },
  homestayCard: {
    width: 150,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  homestayImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 8,
  },
  homestayName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  programCard: {
    width: 240,
    height: 120,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  programImage: {
    width: '100%',
    height: '100%',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;