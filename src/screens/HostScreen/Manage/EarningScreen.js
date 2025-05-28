import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

// Data mẫu cho thu nhập
const earningsData = {
  totalEarnings: 125000000,
  totalBookings: 342,
  profitableBookings: 298,
  monthlyData: [
    { month: 'Jan', food: 2500000, drink: 1200000, snack: 800000, dessert: 600000 },
    { month: 'Feb', food: 3200000, drink: 1500000, snack: 900000, dessert: 700000 },
    { month: 'Mar', food: 4100000, drink: 1800000, snack: 1200000, dessert: 900000 },
    { month: 'Apr', food: 1800000, drink: 800000, snack: 500000, dessert: 400000 },
    { month: 'May', food: 3800000, drink: 1600000, snack: 1100000, dessert: 800000 },
    { month: 'Jun', food: 3500000, drink: 1400000, snack: 1000000, dessert: 750000 },
  ],
  homestayEarnings: [
    {
      id: 1,
      name: 'Villa Sunset Beach',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
      totalEarnings: 54000000,
      bookings: 45,
      avgPrice: 1200000,
      occupancyRate: 85,
    },
    {
      id: 2,
      name: 'Cozy Mountain House',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300',
      totalEarnings: 25600000,
      bookings: 32,
      avgPrice: 800000,
      occupancyRate: 72,
    },
    {
      id: 3,
      name: 'Urban Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300',
      totalEarnings: 10800000,
      bookings: 18,
      avgPrice: 600000,
      occupancyRate: 45,
    },
    {
      id: 4,
      name: 'Beachfront Bungalow',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300',
      totalEarnings: 117000000,
      bookings: 78,
      avgPrice: 1500000,
      occupancyRate: 92,
    },
  ],
};

export default function EarningScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedHomestay, setSelectedHomestay] = useState('all');

  // Format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Tính tổng cho biểu đồ
  const getChartTotal = (data) => {
    return data.food + data.drink + data.snack + data.dessert;
  };

  const maxValue = Math.max(...earningsData.monthlyData.map(getChartTotal));

  // Render biểu đồ cột
  const renderBarChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Thu nhập theo thời gian</Text>
        
        {/* Y-axis labels */}
        <View style={styles.yAxisContainer}>
          {[8, 6, 4, 2, 0].map(value => (
            <Text key={value} style={styles.yAxisLabel}>{value}M</Text>
          ))}
        </View>

        {/* Chart bars */}
        <View style={styles.chartBars}>
          {earningsData.monthlyData.map((data, index) => {
            const total = getChartTotal(data);
            const barHeight = (total / maxValue) * 120;
            
            return (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: barHeight }]}>
                  <View style={[styles.barSegment, { 
                    height: (data.food / total) * barHeight, 
                    backgroundColor: '#3B82F6' 
                  }]} />
                  <View style={[styles.barSegment, { 
                    height: (data.drink / total) * barHeight, 
                    backgroundColor: '#F59E0B' 
                  }]} />
                  <View style={[styles.barSegment, { 
                    height: (data.snack / total) * barHeight, 
                    backgroundColor: '#EF4444' 
                  }]} />
                  <View style={[styles.barSegment, { 
                    height: (data.dessert / total) * barHeight, 
                    backgroundColor: '#10B981' 
                  }]} />
                </View>
                <Text style={styles.xAxisLabel}>{data.month}</Text>
              </View>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          {[
            { label: 'Villa', color: '#3B82F6' },
            { label: 'Apartment', color: '#F59E0B' },
            { label: 'House', color: '#EF4444' },
            { label: 'Bungalow', color: '#10B981' },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.legendItem}
              onPress={() => setCategoryFilter(item.label.toLowerCase())}
            >
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Render homestay item
  const renderHomestayItem = ({ item }) => (
    <TouchableOpacity style={styles.homestayCard}>
      <Image source={{ uri: item.image }} style={styles.homestayImage} />
      <View style={styles.homestayInfo}>
        <Text style={styles.homestayName}>{item.name}</Text>
        <Text style={styles.homestayEarnings}>{formatCurrency(item.totalEarnings)}</Text>
        <View style={styles.homestayStats}>
          <Text style={styles.statText}>📅 {item.bookings} bookings</Text>
          <Text style={styles.statText}>📊 {item.occupancyRate}% occupancy</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Thu Nhập Chi Tiết</Text>
        
        {/* Tab switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Tổng quan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'homestay' && styles.activeTab]}
            onPress={() => setActiveTab('homestay')}
          >
            <Text style={[styles.tabText, activeTab === 'homestay' && styles.activeTabText]}>
              Theo homestay
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Tổng thu nhập</Text>
            <Text style={styles.summaryValue}>{formatCurrency(earningsData.totalEarnings)}</Text>
            <Text style={styles.summaryChange}>+12.5% so với tháng trước</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.halfCard]}>
              <Text style={styles.summaryLabel}>Tổng booking</Text>
              <Text style={styles.summaryValue}>{earningsData.totalBookings}</Text>
              <Text style={styles.summaryChange}>+8.2%</Text>
            </View>
            
            <View style={[styles.summaryCard, styles.halfCard]}>
              <Text style={styles.summaryLabel}>Booking sinh lời</Text>
              <Text style={styles.summaryValue}>{earningsData.profitableBookings}</Text>
              <Text style={styles.summaryChange}>87.1%</Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>📅 Tháng này ▼</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>🏠 Tất cả homestay ▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'overview' ? (
          <>
            {/* Chart */}
            {renderBarChart()}
            
            {/* Top performing homestays */}
            <View style={styles.topPerformersContainer}>
              <Text style={styles.sectionTitle}>Top homestay sinh lời</Text>
              <FlatList
                data={earningsData.homestayEarnings.slice(0, 3)}
                renderItem={renderHomestayItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          </>
        ) : (
          <>
            {/* Homestay filter tabs */}
            <View style={styles.homestayTabs}>
              {['Tất cả', 'Villa', 'Apartment', 'House'].map((tab, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[styles.homestayTab, index === 0 && styles.activeHomestayTab]}
                >
                  <Text style={[styles.homestayTabText, index === 0 && styles.activeHomestayTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* All homestays list */}
            <View style={styles.allHomestaysContainer}>
              <FlatList
                data={earningsData.homestayEarnings}
                renderItem={renderHomestayItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 15,
  },
  halfCard: {
    flex: 1,
    marginBottom: 0,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#495057',
  },
  chartContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  yAxisContainer: {
    position: 'absolute',
    left: 0,
    top: 60,
    height: 120,
    justifyContent: 'space-between',
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    marginLeft: 30,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 30,
    backgroundColor: 'transparent',
    marginBottom: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barSegment: {
    width: '100%',
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#495057',
  },
  homestayTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  homestayTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeHomestayTab: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  homestayTabText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeHomestayTabText: {
    color: '#fff',
  },
  topPerformersContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  allHomestaysContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  homestayCard: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  homestayImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  homestayInfo: {
    flex: 1,
  },
  homestayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  homestayEarnings: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 8,
  },
  homestayStats: {
    flexDirection: 'row',
    gap: 15,
  },
  statText: {
    fontSize: 12,
    color: '#6c757d',
  },
});