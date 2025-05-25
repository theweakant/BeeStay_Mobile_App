import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Banner = ({ 
  imageSource = { uri: 'https://cf.shopee.vn/file/sg-11134201-22110-7wjrxjpvgfkv5a' },
  onPress,
  style,
  imageStyle,
  height = 120,
  resizeMode = 'cover'
}) => {
  return (
    <TouchableOpacity 
      style={[styles.promotionBanner, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={imageSource}
        style={[styles.bannerImage, { height }, imageStyle]}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  promotionBanner: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
  },
});

export default Banner;