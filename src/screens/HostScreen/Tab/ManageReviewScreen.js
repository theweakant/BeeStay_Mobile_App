// ManageReviewScreen.js - Refactored
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { sampleReviews } from '../../../data/MockData';
import ReviewStatsCard from '../../../components/Card/ReviewStatsCard';
import FilterSection from '../../../components/FilterSection';
import ReviewCard from '../../../components/Card/ReviewCard';
import ReviewDetailModal from '../../../components/Modal/ReviewDetailModal';
import ResponseModal from '../../../components/Modal/ResponseModal';

export default function ManageReviewScreen() {
  const [reviews, setReviews] = useState(sampleReviews);
  const [filteredReviews, setFilteredReviews] = useState(sampleReviews);
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);

  // Tính toán thống kê
  const stats = {
    total: reviews.length,
    average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    pending: reviews.filter(r => r.status === 'pending').length,
    needResponse: reviews.filter(r => !r.hasResponse && r.rating <= 3).length,
  };

  // Lọc reviews
  const applyFilters = () => {
    let filtered = reviews;

    if (filterRating !== 'all') {
      if (filterRating === 'high') {
        filtered = filtered.filter(r => r.rating >= 4);
      } else if (filterRating === 'low') {
        filtered = filtered.filter(r => r.rating <= 3);
      } else {
        filtered = filtered.filter(r => r.rating === parseInt(filterRating));
      }
    }

    if (filterStatus !== 'all') {
      if (filterStatus === 'needResponse') {
        filtered = filtered.filter(r => !r.hasResponse && r.rating <= 3);
      } else {
        filtered = filtered.filter(r => r.status === filterStatus);
      }
    }

    if (searchText) {
      filtered = filtered.filter(r => 
        r.guestName.toLowerCase().includes(searchText.toLowerCase()) ||
        r.homestayName.toLowerCase().includes(searchText.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [filterRating, filterStatus, searchText, reviews]);

  // Xem chi tiết review
  const viewReviewDetail = (review) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  // Trả lời review
  const respondToReview = (review) => {
    setSelectedReview(review);
    setResponseModalVisible(true);
  };

  // Lưu phản hồi
  const saveResponse = (responseText) => {
    if (responseText.trim()) {
      setReviews(prev => prev.map(r => 
        r.id === selectedReview.id 
          ? { 
              ...r, 
              hasResponse: true, 
              response: responseText,
              responseDate: new Date().toISOString().split('T')[0]
            }
          : r
      ));
      setResponseModalVisible(false);
      Alert.alert('Thành công', 'Đã lưu phản hồi của bạn!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quản Lý Đánh Giá</Text>
        <ReviewStatsCard stats={stats} />
      </View>

      {/* Filter Section */}
      <FilterSection
        searchText={searchText}
        onSearchChange={setSearchText}
        filterStatus={filterStatus}
        onStatusFilterChange={setFilterStatus}
        filterRating={filterRating}
        onRatingFilterChange={setFilterRating}
      />

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        renderItem={({ item }) => (
          <ReviewCard
            item={item}
            onPress={viewReviewDetail}
            onRespond={respondToReview}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />

      {/* Modals */}
      <ReviewDetailModal
        visible={modalVisible}
        review={selectedReview}
        onClose={() => setModalVisible(false)}
        onRespond={respondToReview}
      />

      <ResponseModal
        visible={responseModalVisible}
        review={selectedReview}
        onClose={() => setResponseModalVisible(false)}
        onSave={saveResponse}
      />
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
  listContent: {
    padding: 20,
  },
});