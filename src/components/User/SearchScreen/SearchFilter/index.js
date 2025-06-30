import React from 'react';
import { View } from 'react-native';
import Search from './Search';
import Filter from './Filter';

export default function SearchFilter({ searchTerm, setSearchTerm, sortOption, setSortOption }) {
  return (
    <View>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter sortOption={sortOption} setSortOption={setSortOption} />
    </View>
  );
}
