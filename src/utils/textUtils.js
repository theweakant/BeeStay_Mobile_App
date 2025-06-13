// utils/textUtils.js
export const truncateText = (text, maxLength = 10) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};



export const getFullAddress = (address) => {
  if (!address) return '';
  return `${address.street}, ${address.district}, ${address.city}, ${address.province}`;
};

export const getFullLocation = (address) => {
  if (!address) return '';
  return `${address.address}, ${address.district}, ${address.city}, ${address.province}`;
};



export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};
    

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};


export const getRecentMonthlyData = (fullData) => {
  if (!fullData || fullData.length === 0) return [];

  const currentMonth = new Date().getMonth(); // 0 - 11

  const mapped = fullData.map((item) => {
    const match = item.month.match(/Tháng (\d+)/);
    const monthNum = match ? parseInt(match[1], 10) - 1 : 0;
    return { ...item, monthNum };
  });

  const recent = mapped
    .filter((item) => item.monthNum <= currentMonth)
    .sort((a, b) => b.monthNum - a.monthNum)
    .slice(0, 4)
    .sort((a, b) => a.monthNum - b.monthNum);

  return recent;
};