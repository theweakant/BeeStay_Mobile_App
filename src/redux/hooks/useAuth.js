// src/redux/hooks/useAuth.js 
import { useSelector, useDispatch } from 'react-redux';
import { 
  sendRegisterOTP, 
  verifyAndRegister,
  setRegistrationEmail,
  setRegistrationFormData,
  nextRegistrationStep,
  prevRegistrationStep,
  resetRegistration,
  clearError,
  logout,
} from '../slices/auth.slice';

export const useAuth = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  return {
    // Auth state
    user: auth.user,
    token: auth.token,
    refreshToken: auth.refreshToken,
    role: auth.role,
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,

    name: auth.user?.name || auth.user?.userName || null,
    
    // Registration state
    registration: auth.registration,
    
    // Auth actions
    logout: () => dispatch(logout()),
    
    // Registration actions
    sendOTP: (email) => dispatch(sendRegisterOTP(email)),
    verifyRegistration: (formData) => {
      // Combine email with form data
      const completeData = {
        userName: formData.userName,
        password: formData.password,
        email: auth.registration.email,
        role: formData.role,
        otp: formData.otp,
      };
      return dispatch(verifyAndRegister(completeData));
    },
    
    // Form management
    setEmail: (email) => dispatch(setRegistrationEmail(email)),
    setFormData: (data) => dispatch(setRegistrationFormData(data)),
    nextStep: () => dispatch(nextRegistrationStep()),
    prevStep: () => dispatch(prevRegistrationStep()),
    resetRegistration: () => dispatch(resetRegistration()),
    clearError: () => dispatch(clearError()),
    
    // Computed values
    get isOTPExpired() {
      return auth.registration.otpExpiry ? Date.now() > auth.registration.otpExpiry : false;
    },
    
    get canSendOTP() {
      return auth.registration.email && auth.registration.email.includes('@');
    },
    
    get canVerify() {
      const { userName, password, role, otp } = auth.registration.formData;
      return userName && password && role && otp && auth.registration.email;
    },

  };
};