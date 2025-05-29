import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Search = ({ 
  placeholder = "Tìm kiếm homestay...",
  onChangeText,
  value,
  showLogo = true,
  logoSource = require('../../assets/Logo/beestay-logo.png'),
  style,
  containerStyle,
  onFilterPress,
  hasActiveFilters = false
}) => {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <View style={[styles.searchBar, style]}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity 
          style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
          onPress={onFilterPress}
        >
          <Ionicons 
            name="options-outline" 
            size={20} 
            color={hasActiveFilters ? "#2196F3" : "#999"} 
          />
          {hasActiveFilters && <View style={styles.filterIndicator} />}
        </TouchableOpacity>
      </View>
      {showLogo && (
        <Image
          source={logoSource}
          style={styles.logo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  filterButton: {
    position: 'relative',
    padding: 5,
  },
  filterButtonActive: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
  },
  filterIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Search;