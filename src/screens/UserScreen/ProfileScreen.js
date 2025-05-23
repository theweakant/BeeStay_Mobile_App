import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import {
  Feather,
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileName}>Palm Thanh Toàn</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Ionicons name="settings" size={24} color="#F5B041" />
            </TouchableOpacity>
          </View>

          <View style={styles.phoneRow}>
            <Text style={styles.phoneNumber}>+84 123456789</Text>
            <View style={styles.verificationTag}>
              <Text style={styles.verificationText}>
                Xác minh điện thoại đã đầy đủ
              </Text>
            </View>
          </View>

          <View style={styles.divider} />
        </View>

        {/* My Page Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trang của tôi</Text>

          <TouchableOpacity style={styles.itemRow}>
            <AntDesign name="clockcircleo" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Homestay đã đặt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <AntDesign name="heart" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Homestay yêu thích</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>

          <TouchableOpacity style={styles.itemRow}>
            <Ionicons name="notifications-outline" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Thông báo</Text>
            <Text style={styles.highlight}>Tiếng Việt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <Ionicons name="language" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Ngôn ngữ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <Feather name="send" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Khu vực</Text>
            <Text style={styles.highlight}>Nha Trang</Text>
          </TouchableOpacity>
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>

          <TouchableOpacity style={styles.itemRow}>
            <FontAwesome name="question-circle-o" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Hỏi đáp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <MaterialIcons name="policy" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Điều khoản & chính sách</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <FontAwesome5 name="square" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Phiên bản</Text>
            <Text style={styles.grayText}>19.5.3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <Ionicons name="information-circle-outline" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Liên hệ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemRow}>
            <MaterialIcons name="logout" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  phoneNumber: {
    color: "#666",
    marginRight: 12,
  },
  verificationTag: {
    backgroundColor: "#fff9db",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  verificationText: {
    fontSize: 12,
    color: "#f1c40f",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  highlight: {
    color: "#F5B041",
  },
  grayText: {
    color: "#888",
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "gray",
  },
  navActiveText: {
    fontSize: 12,
    color: "#F5B041",
  },
})

export default ProfileScreen
