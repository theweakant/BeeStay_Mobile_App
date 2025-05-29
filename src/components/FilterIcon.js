import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

const Filter = ({
  visible,
  onClose,
  filterStatus,
  setFilterStatus,
  filterRating,
  setFilterRating,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Bộ lọc</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Trạng thái:</Text>
            <View style={styles.filterButtons}>
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'active', label: 'Hoạt động' },
                { key: 'inactive', label: 'Tạm dừng' }
              ].map(status => (
                <TouchableOpacity
                  key={status.key}
                  style={[
                    styles.filterButton, 
                    filterStatus === status.key && styles.activeFilter
                  ]}
                  onPress={() => setFilterStatus(status.key)}
                >
                  <Text style={[
                    styles.filterButtonText, 
                    filterStatus === status.key && styles.activeFilterText
                  ]}>
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Đánh giá:</Text>
            <View style={styles.filterButtons}>
              {[
                { key: 'all', label: 'Tất cả' },
                { key: '4.5', label: '4.5+ ⭐' },
                { key: '4.0', label: '4.0+ ⭐' }
              ].map(rating => (
                <TouchableOpacity
                  key={rating.key}
                  style={[
                    styles.filterButton, 
                    filterRating === rating.key && styles.activeFilter
                  ]}
                  onPress={() => setFilterRating(rating.key)}
                >
                  <Text style={[
                    styles.filterButtonText, 
                    filterRating === rating.key && styles.activeFilterText
                  ]}>
                    {rating.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={onClose}
            >
              <Text style={styles.applyButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  filterSection: {
    marginBottom: 25,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  modalActions: {
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Filter;