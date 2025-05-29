// screens/EarningScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

// Components
import TabSelector from '../../../components/TabSelector';
import SummaryCards from '../../../components/Chart/SummaryStatCard';
import FilterButtons from '../../../components/Chart/FilterButtons';
import BarChart from '../../../components/Chart/BarChart';
import HomestayTabs from '../../../components/Chart/TabSwitcher';
import ScrollList from '../../../components/ScrollList';

// Data
import { earningsData } from '../../../data/MockData';

const { width } = Dimensions.get('window');

const mainTabs = [
  { key: 'overview', label: 'Tổng quan' },
  { key: 'homestay', label: 'Theo homestay' },
];

export default function EarningScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedHomestay, setSelectedHomestay] = useState('all');
  const [activeHomestayTab, setActiveHomestayTab] = useState('Tất cả');

  // Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTimeFilter = () => {
    // Logic để hiển thị time filter dropdown
    console.log('Time filter pressed');
  };

  const handleHomestayFilter = () => {
    // Logic để hiển thị homestay filter dropdown
    console.log('Homestay filter pressed');
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    console.log('Category filter:', category);
  };

  const handleHomestayPress = (homestay) => {
    // Logic để xem chi tiết homestay
    console.log('Homestay selected:', homestay.name);
  };

  const handleHomestayTabChange = (tab) => {
    setActiveHomestayTab(tab);
    // Logic để filter homestay theo tab
    console.log('Homestay tab changed:', tab);
  };

  // Filtered data
  const getFilteredHomestays = () => {
    if (activeHomestayTab === 'Tất cả') {
      return earningsData.homestayEarnings;
    }
    // Logic để filter theo loại homestay
    return earningsData.homestayEarnings;
  };

  const getTopPerformers = () => {
    return earningsData.homestayEarnings
      .sort((a, b) => b.totalEarnings - a.totalEarnings)
      .slice(0, 3);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Thu Nhập Chi Tiết</Text>
        
        <TabSelector 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={mainTabs}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <SummaryCards earningsData={earningsData} />

        {/* Filters */}
        <FilterButtons 
          onTimeFilter={handleTimeFilter}
          onHomestayFilter={handleHomestayFilter}
        />

        {activeTab === 'overview' ? (
          <>
            {/* Chart */}
            <BarChart 
              monthlyData={earningsData.monthlyData}
              onCategoryFilter={handleCategoryFilter}
            />
            
            {/* Top performing homestays */}
            <ScrollList
              data={getTopPerformers()}
              title="Top homestay sinh lời"
              onHomestayPress={handleHomestayPress}
            />
          </>
        ) : (
          <>
            {/* Homestay filter tabs */}
            <HomestayTabs 
              activeTab={activeHomestayTab}
              onTabChange={handleHomestayTabChange}
            />

            {/* All homestays list */}
            <ScrollList
              data={getFilteredHomestays()}
              onHomestayPress={handleHomestayPress}
              showTitle={false}
            />
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
  content: {
    flex: 1,
  },
});