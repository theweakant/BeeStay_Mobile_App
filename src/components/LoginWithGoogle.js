import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Glogo from "../../assets/Logo/g_logo.png";

const webClientId = "75416150561-saind5u141gl29jjgrim2uro44filujt.apps.googleusercontent.com";
const iosClientId = "75416150561-t3ia9i1stka3ve3fki5l413gm1or82a1.apps.googleusercontent.com";
const androidClientId = "75416150561-6cpt55s1r5d8rmqceq9vf5gf18132sfg.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const LoginWithGoogle = () => {
  const config = {
    webClientId,
    iosClientId,
    androidClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

const getUserProfile = async (token) => {
  if (!token) return;
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();
    console.log(user); // send to backend
  } catch (error) {
    console.log(error);
  }
};

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("access token", token);
      getUserProfile(token)
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper} onPress={() => promptAsync()}>
        <Image source={Glogo} style={styles.brand} />
        <Text style={styles.txt}>Login With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWithGoogle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});