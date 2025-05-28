import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const HostHomeScreen = () => {
  const dashboardItems = [
    { id: 1, title: 'Analytics', color: '#4CAF50', icon: '📊' },
    { id: 2, title: 'Bookings', color: '#2196F3', icon: '📅' },
    { id: 3, title: 'Reviews', color: '#FF9800', icon: '⭐' },
    { id: 4, title: 'Settings', color: '#9C27B0', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Collaborate Syntech</Text>
        </View>

        {/* Featured Card */}
        <View style={styles.featuredCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Up to 5%</Text>
            <Text style={styles.cardSubtitle}>
              Earn more with our premium hosting features
            </Text>
            <View style={styles.cardImageContainer}>
              <Text style={styles.cardEmoji}>🏞️</Text>
            </View>
          </View>
        </View>

        {/* Dashboard Section */}
        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Manage your feeds</Text>
          
          <View style={styles.dashboardGrid}>
            {dashboardItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.dashboardItem, { backgroundColor: item.color }]}
                activeOpacity={0.8}
              >
                <Text style={styles.dashboardIcon}>{item.icon}</Text>
                <Text style={styles.dashboardItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  featuredCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    marginRight: 15,
  },
  cardImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 24,
  },
  dashboardSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dashboardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  dashboardItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default HostHomeScreen;