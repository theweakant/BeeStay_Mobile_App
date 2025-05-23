import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  StatusBar,
  Image
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaymentMethodsScreen() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const paymentMethods = [
    {
      id: 'momo',
      name: 'Ví MoMo',
    //   icon: require('./assets/momo-logo.png'),
      color: '#ae2070',
      promotion: null
    },
    {
      id: 'zalopay',
      name: 'Ví ZaloPay',
    //   icon: require('./assets/zalopay-logo.png'),
      color: '#0068ff',
      promotion: 'Nhập mã GIZZALOPAY để được giảm giá cho đơn từ 150K'
    },
    {
      id: 'shopeepay',
      name: 'Ví ShopeePay',
    //   icon: require('./assets/shopeepay-logo.png'),
      color: '#ee4d2d',
      promotion: 'Ưu đãi ShopeePay giảm ngay 10.000đ'
    },
    {
      id: 'credit',
      name: 'Thẻ Credit',
      iconType: 'material-community',
      iconName: 'credit-card',
      color: '#2196F3',
      promotion: null
    },
    {
      id: 'atm',
      name: 'Thẻ ATM',
      iconType: 'material-community',
      iconName: 'credit-card-outline',
      color: '#4CAF50',
      promotion: null
    },
    {
      id: 'hotel',
      name: 'Thanh toán tại khách sạn',
      iconType: 'material',
      iconName: 'apartment',
      color: '#FF9800',
      promotion: null,
      note: 'Khách sạn có thể hủy phòng tùy theo tình trạng phòng'
    }
  ];

  // For demo purposes, we'll use placeholder images
  // In a real app, you would use actual image assets
  const renderIcon = (method) => {
    if (method.icon) {
      // This is a placeholder. In a real app, you would use the actual image
      return (
        <View style={[styles.iconContainer, { backgroundColor: method.color }]}>
          <Text style={styles.iconText}>{method.name.charAt(0)}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.iconContainer, { backgroundColor: method.color }]}>
          {method.iconType === 'material-community' && (
            <MaterialCommunityIcons name={method.iconName} size={20} color="white" />
          )}
          {method.iconType === 'material' && (
            <MaterialIcons name={method.iconName} size={20} color="white" />
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Payment Methods List */}
        <View style={styles.methodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.methodItem}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodContent}>
                {renderIcon(method)}
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  {method.promotion && (
                    <Text style={[styles.promotionText, { color: method.color }]}>
                      {method.promotion}
                    </Text>
                  )}
                  {method.note && (
                    <View style={styles.noteContainer}>
                      <Ionicons name="information-circle-outline" size={14} color="#999" />
                      <Text style={styles.noteText}>{method.note}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedMethod === method.id && styles.radioOuterSelected
                ]}>
                  {selectedMethod === method.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            selectedMethod ? styles.confirmButtonActive : {}
          ]}
          disabled={!selectedMethod}
        >
          <Text style={[
            styles.confirmButtonText,
            selectedMethod ? styles.confirmButtonTextActive : {}
          ]}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 28, // To center the title accounting for the back button
  },
  methodsContainer: {
    backgroundColor: '#fff',
    marginTop: 8,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  promotionText: {
    fontSize: 12,
    marginTop: 2,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    flex: 1,
  },
  radioContainer: {
    marginLeft: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#007bff',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  bottomPadding: {
    height: 80, // Extra padding at the bottom to account for the footer
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonActive: {
    backgroundColor: '#007bff',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  confirmButtonTextActive: {
    color: '#fff',
  },
});