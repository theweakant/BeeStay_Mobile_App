// api/endpoints.ts
export const AuthEndpoints = {
    register: '/auth/register',
    login:    '/auth/login',
    facebook: '/auth/facebook/signin',
    google:   '/auth/google/signin',
  };
  

export const UserEndpoints = {
  viewProfile: '/user/view-profile',
  updateProfile: '/user/update-profile',
  uploadAvatar: '/user/upload-avatar',
};
