import React, { useEffect, useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Alert, 
  Text, 
  View, 
  Image, 
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHomestayById } from '../../../redux/slices/homestay.slice';
import { fetchUserByAccount, selectUserProfile, selectUserLoading } from '../../../redux/slices/user.slice';
import { fetchCreateBooking } from '../../../redux/slices/booking.slice';
import { useAuth } from '../../../redux/hooks/useAuth';

import DateTimePickerField from '../../../components/CheckOutScreen/DateTimePickerField';

export default function CheckOutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user } = useAuth(); 

  const accountId = user?.accountId || route.params?.accountId;
  const homestayId = route.params?.homestayId;

  const { selectedHomestay, fetchingById } = useSelector(state => state.homestay);
  const userProfile = useSelector(selectUserProfile);
  const userLoading = useSelector(selectUserLoading);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestName, setGuestName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const paymentMethods = [
    { id: 'CASH', label: 'Tiền mặt'},
    { id: 'TRANSFER', label: 'Chuyển khoản'},
  ];

  useEffect(() => {
    if (accountId) dispatch(fetchUserByAccount(accountId));
    if (homestayId) {
      dispatch(fetchHomestayById(homestayId));
    }
  }, [accountId, homestayId, dispatch]);

  
  useEffect(() => {
    if (userProfile && !isAutoFilled) {
      if (userProfile.phone && !phoneNumber) {
        setPhoneNumber(userProfile.phone);
      }
      if (userProfile.name && !guestName) {
        setGuestName(userProfile.name);
      }
      setIsAutoFilled(true);
    }
  }, [userProfile, isAutoFilled, phoneNumber, guestName]);

  const calculateNights = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const pricePerNight = selectedHomestay?.pricePerNight || 0;
    return nights * pricePerNight;
  };


  const getErrorMessage = (error) => {
    const errorString = error?.toString?.() || error?.message || error || '';
    
    const errorMappings = {
      'Can not book this homestay in this time': 'Khoảng thời gian này đã có người đặt. Vui lòng chọn ngày khác',
      'Homestay is not available': 'Homestay không có sẵn trong thời gian này',
      'Invalid date range': 'Khoảng thời gian không hợp lệ',
      'Check-out date must be after check-in date': 'Ngày check-out phải sau ngày check-in',
      'Booking failed': 'Đặt phòng thất bại. Vui lòng thử lại',
      'Network Error': 'Lỗi kết nối. Vui lòng kiểm tra internet',
    };

    // Tìm key phù hợp trong error message
    for (const [key, value] of Object.entries(errorMappings)) {
      if (errorString.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // Trả về error message mặc định
    return errorString || 'Có lỗi xảy ra. Vui lòng thử lại';
  };

  const handleBooking = async () => {
    if (!accountId || !homestayId) {
      Alert.alert('Lỗi', 'Thiếu thông tin người dùng hoặc homestay.');
      return;
    }

    if (!phoneNumber.trim() || !guestName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin khách hàng.');
      return;
    }

    if (checkInDate >= checkOutDate) {
      Alert.alert('Lỗi', 'Ngày check-out phải sau ngày check-in.');
      return;
    }

    setIsBooking(true);

    const bookingRequest = {
      accountId,
      homestayId,
      phoneNumber,
      fullName: guestName,
      checkIn: checkInDate.toISOString().split('.')[0],
      checkOut: checkOutDate.toISOString().split('.')[0],
      paymentMethod,
      totalPrice: calculateTotal(),
    };

    try {
      const result = await dispatch(fetchCreateBooking(bookingRequest)).unwrap();
      
      const bookingData = {
        ...result,
        fullName: guestName,
        phoneNumber: phoneNumber,
        checkIn: bookingRequest.checkIn,
        checkOut: bookingRequest.checkOut,
        paymentMethod: paymentMethod,
        totalPrice: calculateTotal(),
      };
            
      Alert.alert('Thành công', 'Đặt phòng thành công!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SuccessBooking', { booking: bookingData })
        }
      ]);
    } catch (error) {
      const customMessage = getErrorMessage(error);
      Alert.alert('Lỗi', customMessage);
    } finally {
      setIsBooking(false);
    }
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(method => method.id === paymentMethod);
  };

  const handlePaymentSelect = (methodId) => {
    setPaymentMethod(methodId);
    setShowPaymentDropdown(false);
  };

  if (fetchingById || userLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>
            {fetchingById ? 'Đang tải thông tin homestay...' : 'Đang tải thông tin người dùng...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const selectedMethod = getSelectedPaymentMethod();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Homestay Info Section */}
        {selectedHomestay && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin homestay</Text>
            <View style={styles.homestayInfo}>
              <View style={styles.homestayDetails}>
                <Text style={styles.homestayName}>{selectedHomestay.name}</Text>
                <Text style={styles.homestayMeta}>
                  {selectedHomestay.location?.address}
                </Text>

              </View>
            </View>
          </View>
        )}

        {/* Date Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thời gian</Text>
          
          <View style={styles.dateRow}>
            <View style={styles.dateColumn}>
              <DateTimePickerField
                label="Check-in"
                value={checkInDate}
                onChange={setCheckInDate}
                style={styles.dateInput}
              />
            </View>
            
            <View style={styles.dateColumn}>
              <DateTimePickerField
                label="Check-out"
                value={checkOutDate}
                onChange={setCheckOutDate}
                style={styles.dateInput}
              />
            </View>
          </View>
        </View>

        {/* Guest Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Số điện thoại *
              {userProfile?.phone && (
                <Text style={styles.autoFillLabel}> (tự động điền)</Text>
              )}
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Nhập số điện thoại"
              style={[
                styles.textInput,
                userProfile?.phone && styles.textInputAutoFilled
              ]}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              Họ và tên *
              {userProfile?.name && (
                <Text style={styles.autoFillLabel}> (tự động điền)</Text>
              )}
            </Text>
            <TextInput
              value={guestName}
              onChangeText={setGuestName}
              placeholder="Nhập họ và tên"
              style={[
                styles.textInput,
                userProfile?.name && styles.textInputAutoFilled
              ]}
            />
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Chọn phương thức thanh toán *</Text>
            
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowPaymentDropdown(true)}
            >
              <View style={styles.dropdownButtonContent}>
                <Text style={styles.paymentIcon}>{selectedMethod?.icon}</Text>
                <Text style={styles.dropdownButtonText}>{selectedMethod?.label}</Text>
              </View>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Breakdown Section */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Chi tiết đơn đặt</Text>
  
  <View style={styles.priceRow}>
    <Text style={styles.priceLabel}>Giá gốc 1 đêm</Text>
    <Text style={styles.priceValue}>
      {selectedHomestay?.originalPricePerNight?.toLocaleString() || '700,000'} VND
    </Text>
  </View>
  
  <View style={styles.priceRow}>
    <Text style={styles.priceLabel}>Giá đã giảm 1 đêm</Text>
    <Text style={styles.priceValue}>
      {selectedHomestay?.pricePerNight?.toLocaleString() || '550,000'} VND
    </Text>
  </View>
  
  <View style={styles.priceRow}>
    <Text style={styles.priceLabel}>Tổng đặt cọc</Text>
    <Text style={styles.priceValue}>0 VND</Text>
  </View>
  
  <View style={styles.divider} />
  
  <View style={styles.priceRow}>
    <Text style={styles.priceLabel}>
      Tổng tiền ({calculateNights()} đêm)
    </Text>
    <Text style={styles.priceValue}>
      {calculateTotal().toLocaleString()} VND
    </Text>
  </View>
</View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalSummary}>
          <Text style={styles.totalSummaryLabel}>Thanh toán</Text>
          <Text style={styles.totalSummaryValue}>
            {calculateTotal().toLocaleString()} VND
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.bookButton, isBooking && styles.bookButtonDisabled]}
          onPress={handleBooking}
          disabled={isBooking}
        >
          {isBooking ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.bookButtonText}>Đặt homestay</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Payment Method Dropdown Modal */}
      <Modal
        visible={showPaymentDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPaymentDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPaymentDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderText}>Chọn phương thức thanh toán</Text>
              <TouchableOpacity 
                onPress={() => setShowPaymentDropdown(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.dropdownOption,
                  paymentMethod === method.id && styles.dropdownOptionSelected
                ]}
                onPress={() => handlePaymentSelect(method.id)}
              >
                <Text style={styles.dropdownOptionText}>{method.label}</Text>
                {paymentMethod === method.id && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  homestayInfo: {
    flexDirection: 'row',
  },
  homestayDetails: {
    flex: 1,
  },
  homestayName: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  homestayMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginTop: 8,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  dateColumn: {
    flex: 1,
  },
  dateInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textInputAutoFilled: {
    backgroundColor: '#f0f8ff',
    borderColor: '#4dabf7',
  },
  autoFillLabel: {
    fontSize: 12,
    color: '#4dabf7',
    fontWeight: '400',
  },
  // Dropdown Button Styles
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  dropdownHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownOptionSelected: {
    backgroundColor: '#fff5f0',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  checkMark: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  paymentIcon: {
    fontSize: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  bottomSpacer: {
    height: 120,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  totalSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalSummaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalSummaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
  },
  bookButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',

  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});