import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  StatusBar,
  TextInput
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CheckOutScreen() {
  const navigation = useNavigation();
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('+84 123456789');
  const [guestName, setGuestName] = useState('Palm Thanh Toàn');
  
  const roomPrice = 129000;
  const totalPrice = roomPrice * roomQuantity;
  
  const incrementQuantity = () => {
    setRoomQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (roomQuantity > 1) {
      setRoomQuantity(prev => prev - 1);
    }
  };
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Room Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' }} 
            style={styles.roomImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Room Details */}
        <View style={styles.roomDetailsContainer}>
          <Text style={styles.roomType}>PHÒNG CƠ BẢN</Text>
          <Text style={styles.amenities}>Giường đôi + cửa sổ + tivi + điều hòa + quạt trần</Text>
        </View>
        
        {/* Room Quantity Selector - Added Feature */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Số lượng phòng:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={[styles.quantityButton, roomQuantity <= 1 && styles.quantityButtonDisabled]} 
              onPress={decrementQuantity}
              disabled={roomQuantity <= 1}
            >
              <AntDesign name="minus" size={16} color={roomQuantity <= 1 ? "#ccc" : "#333"} />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{roomQuantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
              <AntDesign name="plus" size={16} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Booking Details */}
        <View style={styles.bookingDetailsContainer}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingType}>Theo giờ | 03 giờ</Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Nhận phòng</Text>
              <Text style={styles.timeValue}>14:00, 20/03</Text>
            </View>
            <View style={styles.timeSeparator}>
              <Ionicons name="arrow-forward" size={16} color="#999" />
            </View>
            <View style={styles.timeBlock}>
              <Text style={styles.timeLabel}>Trả phòng</Text>
              <Text style={styles.timeValue}>17:00, 20/03</Text>
            </View>
          </View>
        </View>
        
        {/* Guest Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Khách đặt homestay</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Họ tên</Text>
            <TextInput
              style={styles.textInput}
              value={guestName}
              onChangeText={setGuestName}
            />
          </View>
        </View>
        
        {/* Payment Method */}
        <TouchableOpacity 
        style={styles.paymentMethodContainer}
        onPress={() => navigation.navigate('PaymentMethod')}
        >
        <View style={styles.paymentMethodLeft}>
            <View style={styles.paymentIcon}>
            <FontAwesome name="credit-card" size={18} color="#4CAF50" />
            </View>
            <Text style={styles.paymentMethodText}>Chọn phương thức thanh toán</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Footer with Total and Book Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Đặt homestay</Text>
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
  imageContainer: {
    width: '100%',
    height: 200,
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
  roomDetailsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  roomType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amenities: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  quantityButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 12,
    minWidth: 40,
    textAlign: 'center',
  },
  bookingDetailsContainer: {
    backgroundColor: '#FFF9E6',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
  },
  changeButton: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  timeSeparator: {
    paddingHorizontal: 8,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
    fontSize: 16,
  },
  paymentMethodContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
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
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: '#666',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});