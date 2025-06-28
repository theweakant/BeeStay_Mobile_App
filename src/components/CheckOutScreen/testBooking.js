import axios from 'axios';

export const testDirectBooking = async () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuZzIwMTIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1MTEwMDY1NSwiZXhwIjoxNzUxMTg3MDU1fQ.ygM5BiVvyEzInEUlA_QpHKydC3eN9bNDZZIjJ0MEO6M'; 

  try {
    const response = await axios.post(
      'https://beestay-azgcfsfpgbdkbmgv.southeastasia-01.azurewebsites.net/bee-stay/api/v1/booking/create',
      {
        accountId: 1,
        checkIn: "2025-07-20T14:00:00",
        checkOut: "2025-07-22T11:00:00",
        fullName: "hao nam",
        homestayId: 7,
        paymentMethod: "CASH",
        phoneNumber: "1221313",
        totalPrice: 400000
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      }
    );

    console.log('✅ Booking success:', response.data);
  } catch (error) {
    console.log('❌ Booking error:', error.response?.data || error.message);
  }
};
