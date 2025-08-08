// api/endpoint.js
export const AuthEndpoints = {
    register: '/v1/auth/register',
    login:    '/v1/auth/login',
    verify: '/v1/auth/verify',
    refreshToken: '/v1/auth/refresh-token'
   
  };
  
export const UserEndpoints = {
  getUserByAccount: (accountId) => `/v1/user/by-account/${accountId}`,
  updateUserByAccount: (accountId) => `/v1/user/update/${accountId}`, 
  updateUserAvatar: (accountId) => `/v1/user/update-avatar/${accountId}`,

  getBooking: (accountId) => `/v1/user/booking?accountId=${accountId}`,

};

export const HostEndpoints = {
  getHostByAccount: (accountId) => `/v1/host/by-account/${accountId}`,
  updateAccountHost: (accountId) => `/v1/host/update/${accountId}`,
  updateAvatarHost: (accountId) => `/v1/host/update-avatar/${accountId}`,

  getBookingByHost: (accountId) => `/v1/host/booking?accountId=${accountId}`,
  checkInBooking: (bookingId) => `/v1/host/booking/check-in/${bookingId}`,
};

export const BookingEndpoints = {
  createBooking: `/v1/booking/create`,

  discardBooking: (bookingId) => `/v1/booking/discard/${bookingId}`,
  cancelBooking: (bookingId) => `/v1/booking/cancel/${bookingId}`,


};



export const HomestayEndpoints = {
  getAllStayCations: '/v1/stay-cation/all', 
  getStayCationByHost: (accountId) => `/v1/stay-cation/get-by-host/${accountId}`,
  getStayCationById: (homeStayId) => `/v1/stay-cation/${homeStayId}`, 

  addStayCationByAccountId: (accountId) => `/v1/stay-cation/add/${accountId}`, 

  updateStayCationById: (homeStayId) => `/v1/stay-cation/${homeStayId}`,

  addStayCationImage: (stayCationId) => `/v1/stay-cation/add-img/${stayCationId}`,
  addStayCationVideo: (stayCationId) => `/v1/stay-cation/add-video/${stayCationId}`, 
  deleteStayCationMedia: (fileUrl) => `/v1/stay-cation/delete-img?url=${encodeURIComponent(fileUrl)}`,
};

export const ReviewEndpoints = {
  addReview: (accountId, stayCationId) => `/v1/review/add?accountId=${accountId}&stayCationId=${stayCationId}`,

};







