// RegisterScreen.js - Container chính quản lý flow
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../redux/hooks/useAuth';

// Import các screen components
import EmailStepScreen from './EmailStepScreen';
import RegisterFormScreen from './RegisterFormScreen';
import SuccessScreen from './SuccessScreen';

export default function RegisterScreen({ navigation }) {
  const { registration, resetRegistration } = useAuth();

  // Debug logging
  console.log('RegisterScreen - Current state:', {
    step: registration.step,
    isComplete: registration.isComplete,
    otpSent: registration.otpSent,
    email: registration.email
  });

  // Reset registration state khi vào screen

  // Reset registration state khi vào screen
  useEffect(() => {
    return () => {
      // Cleanup khi rời khỏi screen
      if (!registration.isComplete) {
        resetRegistration();
      }
    };
  }, []);

  // Render screen dựa trên step và trạng thái
  const renderCurrentStep = () => {
    console.log('📱 Rendering step:', registration.step);
    
    // Ưu tiên step trước, chỉ show success khi thực sự hoàn thành
    switch (registration.step) {
      case 1:
        console.log('→ Rendering EmailStepScreen');
        return <EmailStepScreen />;
      case 2:
        console.log('→ Rendering RegisterFormScreen');
        return <RegisterFormScreen navigation={navigation} />;
      case 3: // Success step
        console.log('→ Rendering SuccessScreen');
        return <SuccessScreen navigation={navigation} />;
      default:
        console.log('→ Rendering default EmailStepScreen');
        return <EmailStepScreen />;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {renderCurrentStep()}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});