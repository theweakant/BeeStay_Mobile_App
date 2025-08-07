import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/auth.slice";
import { fetchUserByAccount, clearUserProfile } from "../../../redux/slices/user.slice";

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user: authUser, isAuthenticated } = useSelector((state) => state.auth);
  const { profile: userProfile, loading: userLoading } = useSelector((state) => state.user);

  // Gọi fetchUser khi màn hình được mở
  React.useEffect(() => {
    if (isAuthenticated && authUser?.accountId) {
      dispatch(fetchUserByAccount(authUser.accountId));
    }
  }, [dispatch, isAuthenticated, authUser?.accountId]);

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          dispatch(clearUserProfile());
        },
      },
    ]);
  };

  // Hiển thị màn hình loading nếu đang tải và chưa có dữ liệu
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

  const displayName = userProfile?.name || authUser?.userName || "Guest";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ImageBackground
        source={require('../../../../assets/Banner/banner1.jpg')}
        style={styles.headerBackground}
        imageStyle={styles.headerImage}
      />


      {/* ScrollView chứa nội dung */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <View style={styles.profileRow}>
          <View style={styles.avatarImage}>
            <Text style={styles.avatarText}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.friendsButton}
            onPress={() => navigation.navigate("OrderBooking")}
          >
            <Text style={styles.friendsButtonText}>Lịch sử đặt phòng</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Stats */}
        <View style={styles.profileStatsRow}>
          <View style={styles.profileInfo}>
            <View style={styles.profileHeaderRow}>
              <Text style={styles.profileName}>{displayName}</Text>
              {userProfile?.verified ? (
                <Ionicons name="checkmark-circle" size={16} color="#2ECC71" />
              ) : (
                <Ionicons name="close-circle" size={16} color="#E74C3C" />
              )}
            </View>
            <Text style={styles.profileEmail}>
              {userProfile?.phone || "0902117202"}
            </Text>
          </View>
          <View style={styles.statsGroup}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile?.currentBooking || 0}</Text>
              <Text style={styles.statLabel}>Đang đặt</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProfile?.reviewCount || 0}</Text>
              <Text style={styles.statLabel}>Đánh giá</Text>
            </View>
          </View>
        </View>

        {/* Cards Grid */}
        <View style={styles.cardsContainer}>
          {/* Hàng 1: Hỏi đáp + Cài đặt */}
          <View style={styles.cardsRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("QA")}
            >
              <View style={styles.cardIcon}>
                <FontAwesome name="question-circle-o" size={24} color="#F5B041" />
              </View>
              <Text style={styles.cardTitle}>Hỏi đáp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={styles.cardIcon}>
                <Ionicons name="settings-outline" size={24} color="#F5B041" />
              </View>
              <Text style={styles.cardTitle}>Hồ sơ</Text>
            </TouchableOpacity>
          </View>

          {/* Hàng 2: Chính sách + Liên hệ */}
          <View style={styles.cardsRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Policy")}
            >
              <View style={styles.cardIcon}>
                <MaterialIcons name="policy" size={24} color="#F5B041" />
              </View>
              <Text style={styles.cardTitle}>Điều khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Contact")}
            >
              <View style={styles.cardIcon}>
                <Ionicons name="information-circle-outline" size={24} color="#F5B041" />
              </View>
              <Text style={styles.cardTitle}>Liên hệ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nút Đăng xuất ở cuối - Không còn là card */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color="#FF6B6B" />
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
headerBackground: {
  position: 'absolute',
  top: -50, // Thêm âm để bao phủ status bar
  left: 0,
  right: 0,
  height: 250, // Tăng thêm để bù phần âm
  zIndex: 1,
},
    headerImage: {

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    height: 120,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 140, 
    backgroundColor: "#FFFFFF",
    borderRadius:20,
    zIndex: 2, 
  },
  scrollContent: {
    paddingBottom: 20,
    backgroundColor: "transparent",
    paddingTop: 0,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e0e0e0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileHeaderRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666666",
    marginTop: 4,
  },
  profileStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 176, 65, 0.1)',
  },
  statsGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  cardsContainer: {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,1) 100%)', // Gradient từ trắng trong suốt xuống xám nhẹ
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: 'rgba(245, 176, 65, 0.3)', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(245, 176, 65, 0.08)',
  },
  cardIcon: {
    width: 52,
    height: 52,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'left',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  friendsButton: {
  position: 'absolute',
  top: 20,
  right: 20,
  backgroundColor: '#fff9f0ff',
  borderWidth: 1.5,
  borderColor: '#F5B041',
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 4,
  },
  friendsButtonText: {
  fontSize: 14,
  color: '#000000ff',
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)', 
    shadowColor: 'rgba(255, 107, 107, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 8,
  },
});

export default AccountScreen;