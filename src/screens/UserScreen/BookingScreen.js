"use client"

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"

export default function BookingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Booking Room</Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <Text style={styles.title}>Phòng đã đặt</Text>

        {/* Empty State Illustration */}
        <View style={styles.emptyState}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png" }}
            style={styles.image}
          />

          <Text style={styles.emptyTitle}>Lịch sử đặt phòng đang trống</Text>

          <Text style={styles.emptyDesc}>
            Hãy lựa chọn và đặt homestay ngay để có được nhiều ưu đãi hấp dẫn
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Đặt homestay ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#1f2937", // gray-800
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerText: {
    color: "#9ca3af", // gray-400
    fontSize: 16,
  },
  main: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 32,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDesc: {
    color: "#6b7280", // gray-500
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#facc15", // yellow-400
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb", // gray-200
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#6b7280", // gray-500
  },
  navActiveText: {
    fontSize: 12,
    color: "#facc15", // yellow-500
  },
})
