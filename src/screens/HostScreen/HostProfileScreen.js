// Main HostProfileScreen.js (Refactored)
import React, { useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth.slice";
import { clearUserProfile } from "../../redux/slices/user.slice";
import { hostData } from '../../data/MockData';

// Import components
import { CoverPhoto } from '../../components/HostProfileScreen/CoverPhoto';
import { ProfileHeader } from '../../components/HostProfileScreen/ProfileHeader';
import { HostStats } from '../../components/HostProfileScreen/HostStats';
import { BioSection } from '../../components/HostProfileScreen/BioSection';
import { ContactInformation } from '../../components/HostProfileScreen/ContactInformation';
import { LanguageSection } from '../../components/HostProfileScreen/LanguageSection';
import { PaymentMethods } from '../../components/HostProfileScreen/PaymentMethods';
import { NotificationSettings } from '../../components/HostProfileScreen/NotificationSettings';
import { ActionButtons } from '../../components/HostProfileScreen/ActionButtons';

// Import modals
import { PaymentMethodModal } from '../../components/HostProfileScreen/PaymentMethodModal';
import { LanguageModal } from '../../components/HostProfileScreen/LanguageModal';
import { LogoutConfirmModal } from '../../components/HostProfileScreen/LogoutConfirmModal';

export default function HostProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(hostData);
  const [editedData, setEditedData] = useState({...hostData});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const saveProfile = () => {
    setProfileData(editedData);
    setIsEditing(false);
    Alert.alert('Thành công', 'Thông tin hồ sơ đã được cập nhật!');
  };

  const toggleNotification = (key) => {
    setEditedData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <CoverPhoto coverPhoto={profileData.coverPhoto} />
        
        <ProfileHeader 
          profileData={profileData}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
          formatDate={formatDate}
        />
        
        <HostStats profileData={profileData} />
        
        <BioSection 
          profileData={profileData}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        
        <ContactInformation 
          profileData={profileData}
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
        />
        
        <LanguageSection 
          profileData={profileData}
          setShowLanguageModal={setShowLanguageModal}
        />
        
        <PaymentMethods 
          profileData={profileData}
          setShowPaymentModal={setShowPaymentModal}
        />
        
        <NotificationSettings 
          editedData={editedData}
          toggleNotification={toggleNotification}
        />
        
        <ActionButtons 
          isEditing={isEditing}
          saveProfile={saveProfile}
          setEditedData={setEditedData}
          profileData={profileData}
          setIsEditing={setIsEditing}
          setShowLogoutConfirm={setShowLogoutConfirm}
        />
      </ScrollView>

      <PaymentMethodModal 
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
      
      <LanguageModal 
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
      
      <LogoutConfirmModal 
        visible={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})