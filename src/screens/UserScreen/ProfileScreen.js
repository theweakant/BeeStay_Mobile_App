import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Feather, AntDesign, Ionicons, FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons"

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-gray-800 py-3 px-4">
        <Text className="text-gray-400 text-base">Account Information</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="p-4 bg-white">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-2xl font-bold">Palm Thanh Toàn</Text>
            <TouchableOpacity>
              <Ionicons name="settings" size={24} color="#F5B041" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-4">
            <Text className="text-gray-600 mr-3">+84 123456789</Text>
            <View className="bg-yellow-100 rounded-full px-2 py-1">
              <Text className="text-xs text-yellow-700">Xác minh điện thoại đã đầy đủ</Text>
            </View>
          </View>

          <View className="h-[1px] bg-gray-200 my-2" />
        </View>

        {/* My Page Section */}
        <View className="px-4 mb-4">
          <Text className="text-base font-medium mb-2">Trang của tôi</Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <AntDesign name="clockcircleo" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Homestay đã đặt</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <AntDesign name="heart" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Homestay yêu thích</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View className="px-4 mb-4">
          <Text className="text-base font-medium mb-2">Cài đặt</Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="notifications-outline" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Thông báo</Text>
            <Text className="text-yellow-500">Tiếng Việt</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="language" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Ngôn ngữ</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Feather name="send" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Khu vực</Text>
            <Text className="text-yellow-500">Nha Trang</Text>
          </TouchableOpacity>
        </View>

        {/* Information Section */}
        <View className="px-4 mb-4">
          <Text className="text-base font-medium mb-2">Thông tin</Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <FontAwesome name="question-circle-o" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Hỏi đáp</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <MaterialIcons name="policy" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Điều khoản & chính sách</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <FontAwesome5 name="square" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Phiên bản</Text>
            <Text className="text-gray-500">19.5.3</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons name="information-circle-outline" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Liên hệ</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <MaterialIcons name="logout" size={20} color="#F5B041" className="mr-4" />
            <Text className="text-base flex-1 ml-3">Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-gray-200 py-2">
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="home-outline" size={22} color="gray" />
          <Text className="text-xs text-gray-500">Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 items-center">
          <MaterialIcons name="history" size={22} color="gray" />
          <Text className="text-xs text-gray-500">Đã xuất</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 items-center">
          <MaterialIcons name="room" size={22} color="gray" />
          <Text className="text-xs text-gray-500">Phòng đã đặt</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 items-center">
          <MaterialIcons name="local-offer" size={22} color="gray" />
          <Text className="text-xs text-gray-500">Ưu đãi</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 items-center">
          <FontAwesome name="user" size={22} color="#F5B041" />
          <Text className="text-xs text-yellow-500">Tài khoản</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
