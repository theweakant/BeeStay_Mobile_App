import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ 
  placeholder = "Bạn muốn đi đâu?",
  onChangeText,
  value,
  showLogo = true,
  logoSource = require('../../assets/Logo/beestay-logo.png'),
  style,
  containerStyle
}) => {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <View style={[styles.searchBar, style]}>
        <Ionicons name="search" size={16} color="#999" style={styles.searchIcon} />
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
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
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
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default SearchBar;