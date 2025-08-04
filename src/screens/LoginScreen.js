"use client";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/auth.slice";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // Navigation handled by AppNavigator
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Đăng nhập thất bại",
        typeof error === "string" ? error : "Có lỗi xảy ra, vui lòng thử lại",
        [{ text: "OK", onPress: () => dispatch(clearError()) }]
      );
    }
  }, [error, dispatch]);

  const handleLogin = async () => {
    if (!userName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu");
      return;
    }

    const credentials = {
      userName: userName.trim(),
      password: password.trim(),
    };

    try {
      await dispatch(loginUser(credentials)).unwrap();
    } catch (_) {
      // Error handled via Redux state & useEffect
    }
  };

  const handleNavigateToRegister = () => {
    if (error) {
      dispatch(clearError());
    }
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/Logo/beestay-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BeeStay xin chào</Text>
        <Text style={styles.headerSubtitle}>
          Đăng nhập và khám phá thêm nhiều homestay mới nào!
        </Text>
      </View>

      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#999"
          value={userName}
          onChangeText={setUserName}
          editable={!loading}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
      </View>

      {/* Improved button with smaller size and rounded corners */}
      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#ffffff" size="small" />
            <Text style={[styles.loginButtonText, { marginLeft: 8 }]}>
              Đang đăng nhập...
            </Text>
          </View>
        ) : (
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text style={styles.registerLink}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 0, 
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 80,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 16,
    color: "#333",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 40,
    shadowColor: "#FFA500",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    color: "#666",
    fontSize: 15,
  },
  registerLink: {
    color: "#FFA500",
    fontWeight: "bold",
    fontSize: 15,
  },
});