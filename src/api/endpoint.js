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
  getAllStayCations: '/v1/stay-cation/all',
  addStayCation: `/v1/stay-cation/add`,
  addStayCationById: (homeStayId) => `/v1/stay-cation/${homeStayId}`,
  addStayCationImage: (stayCationId) => `/v1/stay-cation/add-img/${stayCationId}`,
  
};







