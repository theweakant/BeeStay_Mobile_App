import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ 
  placeholder = "Tên homestay, hotel, quận/huyện",
  onChangeText,
  value,
  showLogo = true,
  logoSource = { uri: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png' },
  style,
  containerStyle
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
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default SearchBar;