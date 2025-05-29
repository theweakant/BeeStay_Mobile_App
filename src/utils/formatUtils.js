// utils/formatUtils.js

/**
 * Format số tiền thành định dạng VND
 * @param {number} amount - Số tiền cần format
 * @returns {string} - Chuỗi tiền tệ đã format
 */


/**
 * Tính tổng thu nhập từ các danh mục
 * @param {object} data - Object chứa các loại thu nhập
 * @returns {number} - Tổng thu nhập
 */
export const getChartTotal = (data) => {
  return data.food + data.drink + data.snack + data.dessert;
};

/**
 * Tính phần trăm thay đổi
 * @param {number} current - Giá trị hiện tại
 * @param {number} previous - Giá trị trước đó
 * @returns {string} - Chuỗi phần trăm với dấu
 */
export const calculatePercentageChange = (current, previous) => {
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};