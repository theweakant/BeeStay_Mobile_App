// api/endpoint.js
export const AuthEndpoints = {
    register: '/v1/auth/register',
    login:    '/v1/auth/login',
    facebook: '/v1/auth/verify',
   
  };
  
export const UserEndpoints = {
  getUserByAccount: (accountId) => `/v1/user/by-account/${accountId}`,
  // updateProfile: '/user/update-profile',
  // uploadAvatar: '/user/upload-avatar',
};

export const HostEndpoints = {
  viewProfile: '/user/view-profile',
  updateProfile: '/user/update-profile',
  uploadAvatar: '/user/upload-avatar',
};


export const HomestayEndpoints = {
  viewProfile: '/user/view-profile',
  updateProfile: '/user/update-profile',
  uploadAvatar: '/user/upload-avatar',
};

export const ReviewEndpoints = {
  viewProfile: '/user/view-profile',
  updateProfile: '/user/update-profile',
  uploadAvatar: '/user/upload-avatar',
};



