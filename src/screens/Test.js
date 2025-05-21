import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function Test() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-blue-500 font-bold text-xl mb-4">NativeWind 4.x đang hoạt động!</Text>
        <View className="bg-yellow-200 p-4 rounded-lg">
          <Text className="text-gray-800">Đây là component kiểm tra styling với TailwindCSS</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}