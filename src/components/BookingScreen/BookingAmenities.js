import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const BookingAmenities = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 6;
  const shouldShowToggle = amenities.length > displayLimit;
  const displayedAmenities = showAll ? amenities : amenities.slice(0, displayLimit);

  const renderIcon = (item) => {
    const iconProps = { size: 18, color: "#007AFF" };
    switch (item.type) {
      case 'font-awesome':
        return <FontAwesome name={item.icon} {...iconProps} />;
      case 'material':
        return <MaterialIcons name={item.icon} {...iconProps} />;
      case 'material-community':
        return <MaterialCommunityIcons name={item.icon} {...iconProps} />;
      default:
        return <MaterialIcons name="check-circle" {...iconProps} />;
    }
  };

  if (!amenities || amenities.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Tiện ích</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{amenities.length}</Text>
        </View>
      </View>

      {/* Grid Layout - 2 columns */}
      <View style={styles.amenitiesGrid}>
        {displayedAmenities.map((item, index) => (
          <View key={item.id || index} style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              {renderIcon(item)}
            </View>
            <Text style={styles.amenityText} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Show More/Less Button */}
      {shouldShowToggle && (
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.toggleText}>
            {showAll ? 'Thu gọn' : `Xem thêm ${amenities.length - displayLimit} tiện ích`}
          </Text>
          <Ionicons 
            name={showAll ? "chevron-up" : "chevron-down"} 
            size={16} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  
  countBadge: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  amenityItem: {
    width: '47%', // 2 columns with gap
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 8,
  },
  
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  
  amenityText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
  
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  
  toggleText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 6,
  },
});

export default BookingAmenities;