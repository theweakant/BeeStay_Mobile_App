import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fffbeb" />
      <ScrollView className="flex-1">
        {/* Header with Logo */}
        <View className="pt-6 px-6 flex-row items-center justify-center">
          <View className="flex-row items-center">
            {/* <Image 
              source={require('../assets/bee-logo.png')} 
              className="w-10 h-10 mr-2"
              defaultSource={require('../assets/bee-logo.png')}
            /> */}
            <Text className="text-2xl font-bold text-amber-600">BeeStay</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-6 pt-8 items-center">
          <Text className="text-3xl font-bold text-center mt-8 text-gray-800">
            Find Your Perfect Home Away From Home
          </Text>
          
          <Text className="text-base text-center mt-4 text-gray-600 px-4">
            Discover beautiful homes, apartments, and unique stays around the world with BeeStay's curated selection.
          </Text>
        </View>

        {/* Features Section */}
        <View className="px-6 py-8">
          <View className="flex-row justify-between mb-6">
            <View className="items-center w-[30%]">
              <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
                <Text className="text-2xl">🔍</Text>
              </View>
              <Text className="text-center text-sm font-medium text-gray-700">Easy Search</Text>
            </View>
            
            <View className="items-center w-[30%]">
              <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
                <Text className="text-2xl">💰</Text>
              </View>
              <Text className="text-center text-sm font-medium text-gray-700">Best Prices</Text>
            </View>
            
            <View className="items-center w-[30%]">
              <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
                <Text className="text-2xl">⭐</Text>
              </View>
              <Text className="text-center text-sm font-medium text-gray-700">Top Rated</Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View className="px-6 pb-12 items-center">
          <TouchableOpacity 
            className="bg-amber-500 w-full py-4 rounded-xl items-center shadow-md"
            onPress={() => navigation.replace('Login')}
          >
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
          
          <Text className="text-gray-500 mt-4 text-center">
            Join thousands of happy travelers finding their perfect stay
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}