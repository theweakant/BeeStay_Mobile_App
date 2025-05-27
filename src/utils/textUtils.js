// utils/textUtils.js
export const truncateText = (text, maxLength = 10) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};



export const getFullAddress = (address) => {
  if (!address) return '';
  return `${address.street}, ${address.district}, ${address.city}, ${address.province}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};
    
