import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

export default function LandingScreen({ navigation }) {
  return (
    <StyledSafeAreaView className="flex-1 bg-amber-50">
      <StatusBar barStyle="dark-content" backgroundColor="#fffbeb" />
      <StyledScrollView className="flex-1">
        {/* Header with Logo */}
        <StyledView className="pt-6 px-6 flex-row items-center justify-center">
          <StyledView className="flex-row items-center">
            <StyledImage 
              source={require('../assets/bee-logo.png')} 
              className="w-10 h-10 mr-2"
              defaultSource={require('../assets/bee-logo.png')}
            />
            <StyledText className="text-2xl font-bold text-amber-600">BeeStay</StyledText>
          </StyledView>
        </StyledView>

        {/* Hero Section */}
        <StyledView className="px-6 pt-8 items-center">
          {/* <StyledImage
            source={require('../assets/house-hero.jpg')}
            className="w-full h-64 rounded-xl"
            resizeMode="cover"
            defaultSource={require('../assets/house-hero.jpg')}
          /> */}
          
          <StyledText className="text-3xl font-bold text-center mt-8 text-gray-800">
            Find Your Perfect Home Away From Home
          </StyledText>
          
          <StyledText className="text-base text-center mt-4 text-gray-600 px-4">
            Discover beautiful homes, apartments, and unique stays around the world with BeeStay's curated selection.
          </StyledText>
        </StyledView>

        {/* Features Section */}
        <StyledView className="px-6 py-8">
          <StyledView className="flex-row justify-between mb-6">
            <StyledView className="items-center w-[30%]">
              <StyledView className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">🔍</StyledText>
              </StyledView>
              <StyledText className="text-center text-sm font-medium text-gray-700">Easy Search</StyledText>
            </StyledView>
            
            <StyledView className="items-center w-[30%]">
              <StyledView className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">💰</StyledText>
              </StyledView>
              <StyledText className="text-center text-sm font-medium text-gray-700">Best Prices</StyledText>
            </StyledView>
            
            <StyledView className="items-center w-[30%]">
              <StyledView className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">⭐</StyledText>
              </StyledView>
              <StyledText className="text-center text-sm font-medium text-gray-700">Top Rated</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* CTA Section */}
        <StyledView className="px-6 pb-12 items-center">
          <StyledTouchableOpacity 
            className="bg-amber-500 w-full py-4 rounded-xl items-center shadow-md"
            onPress={() => navigation.replace('Login')}
          >
            <StyledText className="text-white font-bold text-lg">Get Started</StyledText>
          </StyledTouchableOpacity>
          
          <StyledText className="text-gray-500 mt-4 text-center">
            Join thousands of happy travelers finding their perfect stay
          </StyledText>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}