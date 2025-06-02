import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CoverSection = ({ coverPhoto, onEditCover }) => {
  return (
    <View style={styles.coverContainer}>
      <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
      <TouchableOpacity style={styles.editCoverButton} onPress={onEditCover}>
        <Text style={styles.editCoverText}>Thay đổi ảnh bìa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editCoverText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CoverSection;