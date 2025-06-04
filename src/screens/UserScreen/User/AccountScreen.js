// screens/AccountScreen.js - Cập nhật AccountScreen để sử dụng real API data
import React, { useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
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
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/slices/auth.slice"
import { fetchUserByAccount, clearUserProfile } from "../../../redux/slices/user.slice"

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user: authUser, isAuthenticated } = useSelector((state) => state.auth);
  const { profile: userProfile, loading: userLoading, error: userError } = useSelector((state) => state.user);

  // Fetch user profile when component mounts
  useEffect(() => {
    if (isAuthenticated && authUser?.accountId) {
      dispatch(fetchUserByAccount(authUser.accountId));
    }
  }, [dispatch, isAuthenticated, authUser?.accountId]);

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
            dispatch(clearUserProfile());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  // Show loading spinner while fetching user data
  if (userLoading && !userProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F5B041" />
          <Text style={styles.loadingText}>Đang tải thông tin...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileName}>
              {userProfile?.name || authUser?.userName || "Guest"}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="settings" size={24} color="#F5B041" />
            </TouchableOpacity>
          </View>

          <View style={styles.phoneRow}>
            <Text style={styles.phoneNumber}>
              {userProfile?.phone || "N/A"}
            </Text>
            <View style={styles.verificationTag}>
              {userProfile?.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
              <Text style={styles.verificationText}>
                {userProfile?.verified ? "Người dùng đã xác thực" : "Chưa xác thực"}
              </Text>
            </View>
          </View>

          {/* Additional user info */}
          {userProfile?.email && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email: </Text>
              <Text style={styles.infoValue}>{userProfile.email}</Text>
            </View>
          )}

          {userProfile?.addressResponse && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Địa chỉ: </Text>
              <Text style={styles.infoValue}>
                {`${userProfile.addressResponse.street}, ${userProfile.addressResponse.district}, ${userProfile.addressResponse.city}`}
              </Text>
            </View>
          )}

          <View style={styles.divider} />
        </View>

        {/* Stats Section */}
        {userProfile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thống kê</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.totalBookingSuccess || 0}</Text>
                <Text style={styles.statLabel}>Đặt phòng thành công</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.currentBooking || 0}</Text>
                <Text style={styles.statLabel}>Đang đặt</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.reviewCount || 0}</Text>
                <Text style={styles.statLabel}>Đánh giá</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userProfile.favoriteHomestay?.length || 0}</Text>
                <Text style={styles.statLabel}>Yêu thích</Text>
              </View>
            </View>
            <View style={styles.divider} />
          </View>
        )}

        {/* My Page Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trang của tôi</Text>
          <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('MyOrder')}>
            <AntDesign name="clockcircleo" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Homestay đã đặt</Text>
            {userProfile?.currentBooking > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{userProfile.currentBooking}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('Favorite')}>
            <AntDesign name="heart" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Homestay yêu thích</Text>
            {userProfile?.favoriteHomestay?.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{userProfile.favoriteHomestay.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('Review')}>
            <AntDesign name="retweet" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Đánh giá của tôi</Text>
            {userProfile?.reviewCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{userProfile.reviewCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt</Text>
          <TouchableOpacity style={styles.itemRow} onPress={() => navigation.navigate('Setting')}>
            <AntDesign name="Safety" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Tài khoản đã liên kết</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Ionicons name="language" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Ngôn ngữ</Text>
            <Text style={styles.highlight}>Tiếng Việt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Feather name="send" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Khu vực</Text>
            <Text style={styles.highlight}>
              {userProfile?.addressResponse?.city || "Nha Trang"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>
          <TouchableOpacity 
            style={styles.itemRow}
            onPress={() => navigation.navigate('QA')}
          >
            <FontAwesome name="question-circle-o" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Hỏi đáp</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.itemRow}
            onPress={() => navigation.navigate('Policy')}
          >
            <MaterialIcons name="policy" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Điều khoản & chính sách</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.itemRow}
            onPress={() => navigation.navigate('Contact')}
          >
            <Ionicons name="information-circle-outline" size={20} color="#F5B041" />
            <Text style={styles.itemText}>Liên hệ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow} onPress={handleLogout}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  verificationTag: {
    backgroundColor: "#fff9db",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedBadge: {
    backgroundColor: "#f1c40f",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  verifiedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  verificationText: {
    fontSize: 12,
    color: "#f1c40f",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5B041",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
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
  badge: {
    backgroundColor: "#F5B041",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  highlight: {
    color: "#F5B041",
  },
});

export default AccountScreen