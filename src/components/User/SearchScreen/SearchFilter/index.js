import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  cityFilter,
  setCityFilter,
  priceRangeFilter,
  setPriceRangeFilter,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    city: cityFilter || '',
    rating: sortOption?.includes('rating') ? sortOption : '',
    price: sortOption?.includes('price') ? sortOption : '',
    priceRange: priceRangeFilter || '',
  });

  const filterOptions = {
    cities: [
      { label: 'Tất cả thành phố', value: '' },
      { label: 'Hà Nội', value: 'hanoi' },
      { label: 'Hồ Chí Minh', value: 'hcm' },
    ],
    ratings: [
      { label: 'Mặc định', value: '' },
      { label: 'Đánh giá tăng dần', value: 'rating-asc' },
      { label: 'Đánh giá giảm dần', value: 'rating-desc' },
    ],
    prices: [
      { label: 'Mặc định', value: '' },
      { label: 'Giá thấp nhất', value: 'price-asc' },
      { label: 'Giá cao nhất', value: 'price-desc' },
    ],
    priceRanges: [
      { label: 'Tất cả mức giá', value: '' },
      { label: '500.000 - 1.000.000', value: '500000-1000000' },
      { label: '1.000.000 - 2.000.000', value: '1000000-2000000' },
      { label: '2.000.000 - 4.000.000', value: '2000000-4000000' },
    ],
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (cityFilter) count++;
    if (sortOption?.includes('rating')) count++;
    if (sortOption?.includes('price')) count++;
    if (priceRangeFilter) count++;
    return count;
  };

  const handleApplyFilters = () => {
    setCityFilter(tempFilters.city);
    setPriceRangeFilter(tempFilters.priceRange);
    
    // Set sort option based on rating or price selection
    if (tempFilters.rating) {
      setSortOption(tempFilters.rating);
    } else if (tempFilters.price) {
      setSortOption(tempFilters.price);
    } else {
      setSortOption('');
    }
    
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      city: '',
      rating: '',
      price: '',
      priceRange: '',
    };
    setTempFilters(resetFilters);
    setCityFilter('');
    setPriceRangeFilter('');
    setSortOption('');
    setShowFilterModal(false);
  };

  const renderFilterSection = (title, options, selectedValue, onSelect) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.filterOption,
            selectedValue === option.value && styles.filterOptionSelected,
          ]}
          onPress={() => onSelect(option.value)}
        >
          <Text
            style={[
              styles.filterOptionText,
              selectedValue === option.value && styles.filterOptionTextSelected,
            ]}
          >
            {option.label}
          </Text>
          {selectedValue === option.value && (
            <Icon name="check" size={20} color="#FF6B35" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar and Filter Button */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm homestay theo tên..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#999"
          />
        </View>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            getActiveFilterCount() > 0 && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon 
            name="tune" 
            size={20} 
            color={getActiveFilterCount() > 0 ? "#FF6B35" : "#666"} 
          />
          <Text
            style={[
              styles.filterButtonText,
              getActiveFilterCount() > 0 && styles.filterButtonTextActive,
            ]}
          >
            Lọc
          </Text>
          {getActiveFilterCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowFilterModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Bộ lọc</Text>
              <TouchableOpacity
                onPress={handleResetFilters}
                style={styles.resetButton}
              >
                <Text style={styles.resetButtonText}>Đặt lại</Text>
              </TouchableOpacity>
            </View>

            {/* Filter Content */}
            <ScrollView style={styles.modalContent}>
              {renderFilterSection(
                'Thành phố',
                filterOptions.cities,
                tempFilters.city,
                (value) => setTempFilters(prev => ({ ...prev, city: value }))
              )}

              {renderFilterSection(
                'Đánh giá',
                filterOptions.ratings,
                tempFilters.rating,
                (value) => setTempFilters(prev => ({ 
                  ...prev, 
                  rating: value,
                  price: value ? '' : prev.price
                }))
              )}

              {renderFilterSection(
                'Giá',
                filterOptions.prices,
                tempFilters.price,
                (value) => setTempFilters(prev => ({ 
                  ...prev, 
                  price: value,
                  rating: value ? '' : prev.rating 
                }))
              )}

              {renderFilterSection(
                'Khoảng giá',
                filterOptions.priceRanges,
                tempFilters.priceRange,
                (value) => setTempFilters(prev => ({ ...prev, priceRange: value }))
              )}
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetFooterButton}
                onPress={handleResetFilters}
              >
                <Text style={styles.resetFooterButtonText}>Thiết lập lại</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'relative',
  },
  filterButtonActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2',
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FF6B35',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    padding: 4,
  },
  resetButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  filterOptionSelected: {
    backgroundColor: '#FFF5F2',
    borderRadius: 8,
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666',
  },
  filterOptionTextSelected: {
    color: '#FF6B35',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  resetFooterButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
    alignItems: 'center',
  },
  resetFooterButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SearchFilter;