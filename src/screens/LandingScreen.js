// import React from 'react';
// import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';

// export default function LandingScreen({ navigation }) {
//   return (
//     <SafeAreaView className="flex-1 bg-amber-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#fffbeb" />
//       <ScrollView className="flex-1">
//         {/* Header with Logo */}
//         <View className="pt-6 px-6 flex-row items-center justify-center">
//           <View className="flex-row items-center">
//             {/* <Image 
//               source={require('../assets/bee-logo.png')} 
//               className="w-10 h-10 mr-2"
//               defaultSource={require('../assets/bee-logo.png')}
//             /> */}
//             <Text className="text-2xl font-bold text-amber-600">BeeStay</Text>
//           </View>
//         </View>

//         {/* Hero Section */}
//         <View className="px-6 pt-8 items-center">
//           <Text className="text-3xl font-bold text-center mt-8 text-gray-800">
//             Find Your Perfect Home Away From Home
//           </Text>
          
//           <Text className="text-base text-center mt-4 text-gray-600 px-4">
//             Discover beautiful homes, apartments, and unique stays around the world with BeeStay's curated selection.
//           </Text>
//         </View>

//         {/* Features Section */}
//         <View className="px-6 py-8">
//           <View className="flex-row justify-between mb-6">
//             <View className="items-center w-[30%]">
//               <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
//                 <Text className="text-2xl">🔍</Text>
//               </View>
//               <Text className="text-center text-sm font-medium text-gray-700">Easy Search</Text>
//             </View>
            
//             <View className="items-center w-[30%]">
//               <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
//                 <Text className="text-2xl">💰</Text>
//               </View>
//               <Text className="text-center text-sm font-medium text-gray-700">Best Prices</Text>
//             </View>
            
//             <View className="items-center w-[30%]">
//               <View className="w-14 h-14 bg-amber-100 rounded-full items-center justify-center mb-2">
//                 <Text className="text-2xl">⭐</Text>
//               </View>
//               <Text className="text-center text-sm font-medium text-gray-700">Top Rated</Text>
//             </View>
//           </View>
//         </View>

//         {/* CTA Section */}
//         <View className="px-6 pb-12 items-center">
//           <TouchableOpacity 
//             className="bg-amber-500 w-full py-4 rounded-xl items-center shadow-md"
//             onPress={() => navigation.replace('Login')}
//           >
//             <Text className="text-white font-bold text-lg">Get Started</Text>
//           </TouchableOpacity>
          
//           <Text className="text-gray-500 mt-4 text-center">
//             Join thousands of happy travelers finding their perfect stay
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fffbeb" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>BeeStay</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>Find Your Perfect Home Away From Home</Text>
          <Text style={styles.subtitle}>
            Discover beautiful homes, apartments, and unique stays around the world with BeeStay's curated selection.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>🔍</Text>
            </View>
            <Text style={styles.featureText}>Easy Search</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>💰</Text>
            </View>
            <Text style={styles.featureText}>Best Prices</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>⭐</Text>
            </View>
            <Text style={styles.featureText}>Top Rated</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtitle}>
            Join thousands of happy travelers finding their perfect stay
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbeb', // bg-amber-50
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d97706', // text-amber-600
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937', // text-gray-800
    textAlign: 'center',
    marginTop: 32,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    color: '#4b5563', // text-gray-600
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
    width: '30%',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    backgroundColor: '#fef3c7', // bg-amber-100
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  featureText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // text-gray-700
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f59e0b', // bg-amber-500
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ctaSubtitle: {
    color: '#6b7280', // text-gray-500
    marginTop: 16,
    textAlign: 'center',
  },
});
