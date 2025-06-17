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

};

export const HostEndpoints = {
  getHostByAccount: (accountId) => `/v1/host/by-account/${accountId}`,
  updateAccountHost: (accountId) => `/v1/host/update/${accountId}`,
  updateAvatarHost: (accountId) => `/v1/host/update-avatar/${accountId}`,


};

export const HomestayEndpoints = {
  getAllStayCations: '/v1/stay-cation/all', //yy
  getStayCationByHost: (accountId) => `/v1/stay-cation/get-by-host/${accountId}`,//yy
  getStayCationById: (homeStayId) => `/v1/stay-cation/${homeStayId}`, //yy

  addStayCationByAccountId: (accountId) => `/v1/stay-cation/add/${accountId}`, //yy

  updateStayCationById: (homeStayId) => `/v1/stay-cation/${homeStayId}`,//y

  addStayCationImage: (stayCationId) => `/v1/stay-cation/add-img/${stayCationId}`,//n
  addStayCationVideo: (stayCationId) => `/v1/stay-cation/add-video/${stayCationId}`, //n

};







