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
import { earningsData, HomestayData } from '../../../data/MockData';

//Utils
import {getRecentMonthlyData} from '../../../utils/textUtils';

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
    console.log('Time filter pressed');
  };

  const handleHomestayFilter = () => {
    console.log('Homestay filter pressed');
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    console.log('Category filter:', category);
  };

  const handleHomestayPress = (homestay) => {
    console.log('Homestay selected:', homestay.name);
  };

  const handleHomestayTabChange = (tab) => {
    setActiveHomestayTab(tab);
    console.log('Homestay tab changed:', tab);
  };

  const getFilteredHomestays = () => {
    if (activeHomestayTab === 'Tất cả') {
      return HomestayData;
    }
    // TODO: Filter by category
    return HomestayData;
  };

  const getTopPerformers = () => {
    return [...HomestayData]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
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
              monthlyData={getRecentMonthlyData(earningsData.monthlyData)} 
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
            <HomestayTabs 
              activeTab={activeHomestayTab}
              onTabChange={handleHomestayTabChange}
            />
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