// bookingUtils.js

/**
 * Convert imageList array to the format expected by the component
 * @param {string[]} imageList - Array of image URLs
 * @returns {Object[]} Array of objects with id and uri properties
 */
export const convertToHotelImages = (imageList) => {
  return imageList.map((uri, index) => ({
    id: (index + 1).toString(),
    uri: uri
  }));
};

/**
 * Create amenities array from homestayData.amenities object
 * @param {Object} amenities - Amenities object with boolean values
 * @returns {Object[]} Array of amenity objects with icon information
 */
export const getAmenitiesArray = (amenities) => {
  const amenityList = [];
  
  const amenityConfig = {
    wifi: {
      name: 'Wifi',
      icon: 'wifi',
      type: 'font-awesome'
    },
    airConditioner: {
      name: 'Điều hòa',
      icon: 'air-conditioner',
      type: 'material-community'
    },
    kitchen: {
      name: 'Bếp',
      icon: 'kitchen',
      type: 'material'
    },
    privateBathroom: {
      name: 'Phòng tắm riêng',
      icon: 'bathtub',
      type: 'font-awesome'
    },
    pool: {
      name: 'Hồ bơi',
      icon: 'pool',
      type: 'material'
    },
    parking: {
      name: 'Bãi đỗ xe',
      icon: 'local-parking',
      type: 'material'
    },
    balcony: {
      name: 'Ban công',
      icon: 'balcony',
      type: 'material-community'
    },
    bbqArea: {
      name: 'Khu BBQ',
      icon: 'grill',
      type: 'material-community'
    },
    roomService: {
      name: 'Dịch vụ phòng',
      icon: 'room-service',
      type: 'material'
    },
    securityCamera: {
      name: 'Camera an ninh',
      icon: 'security-camera',
      type: 'material-community'
    },
    petAllowed: {
      name: 'Cho phép thú cưng',
      icon: 'pets',
      type: 'material'
    }
  };

  // Loop through amenities and add available ones to the list
  Object.keys(amenities).forEach(key => {
    if (amenities[key] && amenityConfig[key]) {
      amenityList.push({
        id: key,
        ...amenityConfig[key],
        available: true
      });
    }
  });
  
  return amenityList;
};

/**
 * Format price to Vietnamese currency format
 * @param {number} price - Price number
 * @returns {string} Formatted price string with Vietnamese đ symbol
 */
export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toLocaleString('vi-VN') + 'đ';
  }
  return 'N/A';
};
/**
 * Get star rating array for rendering stars
 * @param {number} rating - Rating value (e.g., 4.5)
 * @returns {Object[]} Array of star objects with type (full, half, empty)
 */
export const getStarRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push({ key: i, type: 'full' });
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push({ key: i, type: 'half' });
    } else {
      stars.push({ key: i, type: 'empty' });
    }
  }
  
  return stars;
};

/**
 * Format date to Vietnamese format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculate discount amount
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount amount
 */
export const calculateDiscountAmount = (originalPrice, discountedPrice) => {
  return originalPrice - discountedPrice;
};

/**
 * Get policy text based on policy object
 * @param {Object} policies - Policies object
 * @returns {Object} Object with formatted policy texts
 */
export const getPolicyTexts = (policies) => {
  return {
    refund: policies.isRefundable ? 'Có thể hoàn tiền khi hủy' : 'Không thể hủy hoặc thay đổi',
    pet: policies.allowPet ? 'Cho phép thú cưng' : 'Không cho phép thú cưng',
    smoking: policies.allowSmoking ? 'Cho phép hút thuốc' : 'Không cho phép hút thuốc'
  };
};