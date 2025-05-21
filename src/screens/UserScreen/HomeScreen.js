import React from 'react';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import { styled } from 'nativewind';
import InfoCard from '../../components/InfoCard'; // cập nhật đường dẫn nếu khác

const StyledTextInput = styled(TextInput);

export default function HomeScreen (){
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-yellow-100 p-4">
        <Text className="text-xs text-gray-700">Khám phá staycation và ưu đãi tại</Text>
        <Text className="text-base text-orange-600 font-semibold mb-2">Nha Trang</Text>
        <StyledTextInput
          placeholder="Tên homestay, hoặc quận/huyện"
          className="bg-white rounded-md p-2 text-sm"
        />
        <Image
          source={{
            uri: 'https://cf.shopee.vn/file/63fa27d6c4bd94d9a7c1f9e9bc8ff43f_xxhdpi',
          }}
          className="w-full h-28 rounded-md mt-4"
          resizeMode="cover"
        />
      </View>

      {/* Flash Sale Section */}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold">⚡ Flash Sale</Text>
          <Text className="text-xs text-gray-500">Xem tất cả</Text>
        </View>

        <View className="flex-row space-x-3">
          <InfoCard
            imageUrl="https://picsum.photos/200"
            name="Quy Duong Rose"
            rating={2.5}
            reviews={456}
            location="Vũng Tàu"
            currentPrice={120000}
            oldPrice={180000}
          />
          <InfoCard
            imageUrl="https://picsum.photos/201"
            name="Quoc Bao Love"
            rating={3.5}
            reviews={390}
            location="Phước Hải"
            currentPrice={80000}
            oldPrice={120000}
          />
        </View>
      </View>

      {/* Ưu đãi đặc biệt Section */}
      <View className="p-4 pt-2">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-semibold">🎁 Ưu đãi đặc biệt</Text>
          <Text className="text-xs text-gray-500">Xem tất cả</Text>
        </View>

        <View className="flex-row space-x-3">
          <InfoCard
            imageUrl="https://picsum.photos/202"
            name="Love Sea"
            rating={4.0}
            reviews={789}
            location="Nha Trang"
            currentPrice={100000}
            oldPrice={140000}
          />
          <InfoCard
            imageUrl="https://picsum.photos/203"
            name="Sky Hill"
            rating={4.2}
            reviews={600}
            location="Đà Lạt"
            currentPrice={95000}
            oldPrice={135000}
          />
        </View>
      </View>
    </ScrollView>
  );
};


