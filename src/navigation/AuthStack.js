import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import EmailStepScreen from '../screens/RegisterScreen/EmailStepScreen';
import RegisterFormScreen from '../screens/RegisterScreen/RegisterFormScreen';
import SuccessScreen from '../screens/RegisterScreen/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="EmailStep" component={EmailStepScreen} />
      <Stack.Screen name="RegisterForm" component={RegisterFormScreen} />
      <Stack.Screen name="RegisterSuccess" component={SuccessScreen} />
    </Stack.Navigator>
  );
}
