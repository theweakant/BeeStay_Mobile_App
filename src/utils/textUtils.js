// utils/textUtils.js
export const truncateText = (text, maxLength = 10) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
