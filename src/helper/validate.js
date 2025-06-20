// helpers/validate.js

export const validateHomestayForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Tên homestay không được để trống';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Tên homestay phải có ít nhất 3 ký tự';
  }

  // Description validation
  if (!formData.description.trim()) {
    errors.description = 'Mô tả không được để trống';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'Mô tả phải có ít nhất 10 ký tự';
  }

  // Price validation
  if (!formData.pricePerNight.trim()) {
    errors.pricePerNight = 'Giá không được để trống';
  } else {
    const price = parseFloat(formData.pricePerNight);
    if (isNaN(price) || price <= 0) {
      errors.pricePerNight = 'Giá phải là số dương';
    } else if (price < 50000) {
      errors.pricePerNight = 'Giá phải lớn hơn 50,000 VND';
    }
  }

  // Original price validation
  if (formData.originalPricePerNight.trim()) {
    const originalPrice = parseFloat(formData.originalPricePerNight);
    const currentPrice = parseFloat(formData.pricePerNight);
    if (isNaN(originalPrice) || originalPrice <= 0) {
      errors.originalPricePerNight = 'Giá gốc phải là số dương';
    } else if (originalPrice < currentPrice) {
      errors.originalPricePerNight = 'Giá gốc phải lớn hơn hoặc bằng giá hiện tại';
    }
  }

  // Room count validation
  if (!formData.roomCount.trim()) {
    errors.roomCount = 'Số phòng không được để trống';
  } else {
    const roomCount = parseInt(formData.roomCount);
    if (isNaN(roomCount) || roomCount <= 0) {
      errors.roomCount = 'Số phòng phải là số nguyên dương';
    }
  }

  // Max guests validation
  if (!formData.maxGuests.trim()) {
    errors.maxGuests = 'Số khách tối đa không được để trống';
  } else {
    const maxGuests = parseInt(formData.maxGuests);
    if (isNaN(maxGuests) || maxGuests <= 0) {
      errors.maxGuests = 'Số khách tối đa phải là số nguyên dương';
    }
  }

  // Bed count validation
  if (!formData.bedCount.trim()) {
    errors.bedCount = 'Số giường không được để trống';
  } else {
    const bedCount = parseInt(formData.bedCount);
    if (isNaN(bedCount) || bedCount <= 0) {
      errors.bedCount = 'Số giường phải là số nguyên dương';
    }
  }

  // Bathroom count validation
  if (!formData.bathroomCount.trim()) {
    errors.bathroomCount = 'Số phòng tắm không được để trống';
  } else {
    const bathroomCount = parseInt(formData.bathroomCount);
    if (isNaN(bathroomCount) || bathroomCount <= 0) {
      errors.bathroomCount = 'Số phòng tắm phải là số nguyên dương';
    }
  }

  // Location validation
  if (!formData.location.address.trim()) {
    errors.address = 'Địa chỉ không được để trống';
  }
  if (!formData.location.district.trim()) {
    errors.district = 'Quận/Huyện không được để trống';
  }
  if (!formData.location.city.trim()) {
    errors.city = 'Thành phố không được để trống';
  }
  if (!formData.location.province.trim()) {
    errors.province = 'Tỉnh/Thành phố không được để trống';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};