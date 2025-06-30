//HostTab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

//Manage
import HostHomeScreen from '../../screens/HostScreen/Tab/HostHomeScreen';
import EarningScreen from '../../screens/HostScreen/Tab/EarningScreen';
import ManageReviewScreen from '../../screens/HostScreen/Tab/ManageReviewScreen';
import HostHomestayScreen from '../../screens/HostScreen/Tab/HostHomestayScreen';
import HostProfileScreen from '../../screens/HostScreen/Tab/HostProfileScreen';

import { Home, Search, Calendar, Gift, User } from 'lucide-react-native'; 

const Tab = createBottomTabNavigator();

export default function HostTabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
    <Tab.Screen
      name="Trang Chủ"
      component={HostHomeScreen}
      options={{
        tabBarLabel: "Trang Chủ",
        tabBarIcon: ({ color }) => <Home size={22} color={color} />,
      }}
    />
    <Tab.Screen
      name="Homestays"
      component={HostHomestayScreen}
      options={{
        tabBarLabel: "Chỗ Ở",
        tabBarIcon: ({ color }) => <Search size={22} color={color} />,
      }}
    />
    <Tab.Screen
      name="Earning"
      component={EarningScreen}
      options={{
        tabBarLabel: "Thu Nhập",
        tabBarIcon: ({ color }) => <Calendar size={22} color={color} />,
      }}
    />
    <Tab.Screen
      name="ManageReview"
      component={ManageReviewScreen}
      options={{
        tabBarLabel: "Đánh Giá",
        tabBarIcon: ({ color }) => <Gift size={22} color={color} />,
      }}
    />
    <Tab.Screen
      name="HostProfile"
      component={HostProfileScreen}
      options={{
        tabBarLabel: "Hồ Sơ",
        tabBarIcon: ({ color }) => <User size={22} color={color} />,
      }}
    />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
  },
});
