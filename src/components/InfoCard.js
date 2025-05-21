import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

const InfoCard = ({
  imageUrl,
  name,
  rating,
  reviews,
  location,
  currentPrice,
  oldPrice,
  onPress,
}) => {
  return (
    <StyledTouchable
      className="w-[200px] rounded-xl bg-white overflow-hidden shadow-md mx-2 mb-4"
      onPress={onPress}
    >
      <StyledImage source={{ uri: imageUrl }} className="w-full h-32" resizeMode="cover" />
      <View className="p-3">
        <Text className="text-base font-semibold mb-1">{name}</Text>

        <View className="flex-row items-center mb-2">
          <AntDesign name="star" size={14} color="#FFD700" />
          <Text className="ml-1 font-semibold text-black text-sm">{rating}</Text>
          <Text className="ml-1 text-gray-500 text-xs">({reviews}) • {location}</Text>
        </View>

        <Text className="text-red-600 text-base font-bold">
          {currentPrice.toLocaleString('vi-VN')}đ
        </Text>
        <Text className="text-gray-400 text-xs line-through">
          {oldPrice.toLocaleString('vi-VN')}đ / 1 giờ
        </Text>
      </View>
    </StyledTouchable>
  );
};

export default InfoCard;
