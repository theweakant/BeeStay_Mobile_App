import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import InfoCard from '../../components/InfoCard';
import { HomestayData, newHomestays, recommendedHomestays } from '../../data/MockData'; 
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
const navigation = useNavigation();

  // Handle card press
const handleCardPress = (item) => {
  navigation.navigate('Detail', { item });
};

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
            {HomestayData.map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
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
            {HomestayData.map((item) => (
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
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
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
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
              <InfoCard
                key={item.id}
                item={item}
                onPress={handleCardPress}
              />
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
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 16,
    color: '#666',
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  promotionBanner: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF6B00',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#FF6B00',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  horizontalScrollView: {
    paddingLeft: 20,
  },
  programCard: {
    width: 250,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  programImage: {
    width: '100%',
    height: 120,
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;