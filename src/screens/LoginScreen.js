"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native"

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-0">
      {/* Close Button */}
      <TouchableOpacity className="self-start p-2.5 mt-2.5">
        <Text className="text-lg font-light">✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="mt-5 mb-8">
        <Text className="text-2xl font-bold mb-2">BeeStay xin chào!!!</Text>
        <Text className="text-sm text-gray-600 leading-5">
          Đăng nhập để đặt phòng với những ưu đãi độc quyền dành cho thành viên.
        </Text>
      </View>

      {/* Phone Input */}
      <View className="flex-row border border-gray-200 rounded-lg mb-5 h-[50px] items-center">
        <TouchableOpacity className="flex-row items-center px-2.5 border-r border-gray-200 h-full">
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" }}
            className="w-5 h-3.5 mr-1.5"
          />
          <Text className="text-sm">+84</Text>
        </TouchableOpacity>
        <TextInput
          className="flex-1 h-full px-2.5"
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity className="bg-[#F5B041] rounded-lg h-[50px] justify-center items-center mb-8">
        <Text className="text-white text-base font-semibold">Đăng nhập & đặt homestay ngay</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <View className="items-center">
        <Text className="text-gray-400 mb-5">Hoặc đăng nhập bằng</Text>
        <View className="flex-row justify-center w-full">
          <TouchableOpacity className="w-10 h-10 rounded-full justify-center items-center mx-4">
            <Text className="text-2xl text-[#3b5998]">f</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full justify-center items-center mx-4">
            <Text className="text-2xl text-[#db4437]">G</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full justify-center items-center mx-4">
            <Text className="text-2xl">🍎</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
