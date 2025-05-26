import { Linking, Alert, Platform } from 'react-native';

/**
 * Mở Google Maps với địa chỉ cụ thể
 * @param {string} address - Địa chỉ đầy đủ để tìm kiếm
 */
export const openGoogleMaps = async (address) => {
  try {
    // Encode địa chỉ để đảm bảo URL hợp lệ
    const encodedAddress = encodeURIComponent(address);
    
    // URL scheme cho Google Maps
    const googleMapsUrl = Platform.select({
      ios: `comgooglemaps://?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`
    });
    
    // URL web fallback nếu app không có Google Maps
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Kiểm tra xem có thể mở Google Maps app không
    const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsUrl);
    
    if (canOpenGoogleMaps) {
      // Mở Google Maps app
      await Linking.openURL(googleMapsUrl);
    } else {
      // Fallback: mở trên browser
      const canOpenWeb = await Linking.canOpenURL(webUrl);
      if (canOpenWeb) {
        await Linking.openURL(webUrl);
      } else {
        Alert.alert(
          'Lỗi',
          'Không thể mở bản đồ. Vui lòng kiểm tra lại thiết bị của bạn.',
          [{ text: 'OK' }]
        );
      }
    }
  } catch (error) {
    console.error('Error opening Google Maps:', error);
    Alert.alert(
      'Lỗi',
      'Có lỗi xảy ra khi mở bản đồ. Vui lòng thử lại.',
      [{ text: 'OK' }]
    );
  }
};

/**
 * Mở Apple Maps (chỉ cho iOS) với địa chỉ cụ thể
 * @param {string} address - Địa chỉ đầy đủ để tìm kiếm
 */
export const openAppleMaps = async (address) => {
  if (Platform.OS !== 'ios') {
    console.warn('Apple Maps chỉ khả dụng trên iOS');
    return;
  }
  
  try {
    const encodedAddress = encodeURIComponent(address);
    const appleMapsUrl = `http://maps.apple.com/?q=${encodedAddress}`;
    
    const canOpen = await Linking.canOpenURL(appleMapsUrl);
    if (canOpen) {
      await Linking.openURL(appleMapsUrl);
    } else {
      Alert.alert(
        'Lỗi',
        'Không thể mở Apple Maps.',
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    console.error('Error opening Apple Maps:', error);
    Alert.alert(
      'Lỗi',
      'Có lỗi xảy ra khi mở Apple Maps.',
      [{ text: 'OK' }]
    );
  }
};

/**
 * Hiển thị lựa chọn app bản đồ (iOS) hoặc mở Google Maps trực tiếp (Android)
 * @param {string} address - Địa chỉ đầy đủ để tìm kiếm
 */
export const openMapsWithChoice = (address) => {
  if (Platform.OS === 'ios') {
    Alert.alert(
      'Chọn ứng dụng bản đồ',
      'Bạn muốn mở bằng ứng dụng nào?',
      [
        {
          text: 'Apple Maps',
          onPress: () => openAppleMaps(address)
        },
        {
          text: 'Google Maps',
          onPress: () => openGoogleMaps(address)
        },
        {
          text: 'Hủy',
          style: 'cancel'
        }
      ]
    );
  } else {
    // Android: mở Google Maps trực tiếp
    openGoogleMaps(address);
  }
};