import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// api/endpoint.js
export const AuthEndpoints = {
    register: '/v1/auth/register',
    login:    '/v1/auth/login',
    verify: '/v1/auth/verify',
   
  };
  
export const UserEndpoints = {
  getUserByAccount: (accountId) => `/v1/user/by-account/${accountId}`,
  updateUser: '/v1/user/update'

};

export const HostEndpoints = {
  getHostByAccount: (accountId) => `/v1/host/by-account/${accountId}`,
  getHostById: (hostId) => `/v1/host/${hostId}`,
  
  // updateHost


};

export const HomestayEndpoints = {
  addHomestay: `/v1/stay-cation/add`,
  addHomestayImage: (homestayId) => `/v1/stay-cation/add-img/${homestayId}`,
  getAllHomestay: '/v1/stay-cation/all',
};







