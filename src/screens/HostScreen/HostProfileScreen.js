import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import {hostData} from '../../data/MockData'; 
const { width } = Dimensions.get('window');
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/auth.slice"
import { fetchUserByAccount, clearUserProfile } from "../../redux/slices/user.slice"



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
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: () => {
            dispatch(logout());
            dispatch(clearUserProfile());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };


  // Format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Lưu thông tin đã chỉnh sửa
  const saveProfile = () => {
    setProfileData(editedData);
    setIsEditing(false);
    Alert.alert('Thành công', 'Thông tin hồ sơ đã được cập nhật!');
  };

  // Toggle notification settings
  const toggleNotification = (key) => {
    setEditedData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  // Render verification badge
  const renderVerificationBadge = (isVerified) => (
    <View style={[styles.verificationBadge, 
      { backgroundColor: isVerified ? '#E8F5E8' : '#FFF3E0' }
    ]}>
      <Text style={[styles.verificationText, 
        { color: isVerified ? '#2E7D32' : '#F57C00' }
      ]}>
        {isVerified ? '✓ Đã xác thực' : '! Chưa xác thực'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: profileData.coverPhoto }} style={styles.coverPhoto} />
          <TouchableOpacity style={styles.editCoverButton}>
            <Text style={styles.editCoverText}>Thay đổi ảnh bìa</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={editedData.name}
                onChangeText={(text) => setEditedData({...editedData, name: text})}
              />
            ) : (
              <Text style={styles.name}>{profileData.name}</Text>
            )}
            <Text style={styles.location}>{profileData.location}</Text>
            <Text style={styles.joinDate}>Thành viên từ {formatDate(profileData.joinDate)}</Text>
          </View>
        </View>

        {/* Host Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.rating}</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.totalProperties}</Text>
            <Text style={styles.statLabel}>Homestay</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.totalBookings}</Text>
            <Text style={styles.statLabel}>Lượt đặt</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.responseRate}%</Text>
            <Text style={styles.statLabel}>Phản hồi</Text>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          {isEditing ? (
            <TextInput
              style={styles.bioInput}
              value={editedData.bio}
              onChangeText={(text) => setEditedData({...editedData, bio: text})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.bioText}>{profileData.bio}</Text>
          )}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📧</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.email}
                onChangeText={(text) => setEditedData({...editedData, email: text})}
                keyboardType="email-address"
              />
            ) : (
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{profileData.email}</Text>
              </View>
            )}
            {renderVerificationBadge(profileData.verificationStatus.email)}
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>📱</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.phone}
                onChangeText={(text) => setEditedData({...editedData, phone: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Số điện thoại</Text>
                <Text style={styles.infoValue}>{profileData.phone}</Text>
              </View>
            )}
            {renderVerificationBadge(profileData.verificationStatus.phone)}
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>🏠</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={editedData.location}
                onChangeText={(text) => setEditedData({...editedData, location: text})}
              />
            ) : (
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Địa chỉ</Text>
                <Text style={styles.infoValue}>{profileData.location}</Text>
              </View>
            )}
            {renderVerificationBadge(profileData.verificationStatus.address)}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ngôn ngữ</Text>
          <View style={styles.languageContainer}>
            {profileData.languages.map((language, index) => (
              <View key={index} style={styles.languageTag}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ))}
            <TouchableOpacity 
              style={styles.addLanguageButton}
              onPress={() => setShowLanguageModal(true)}
            >
              <Text style={styles.addLanguageText}>+ Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          
          {profileData.paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethod}>
              <View style={styles.paymentIconContainer}>
                <Text style={styles.paymentIcon}>
                  {method.type === 'bank' ? '🏦' : '💳'}
                </Text>
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentNumber}>{method.number}</Text>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Mặc định</Text>
                </View>
              )}
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.addPaymentButton}
            onPress={() => setShowPaymentModal(true)}
          >
            <Text style={styles.addPaymentText}>+ Thêm phương thức thanh toán</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt thông báo</Text>
          
          <View style={styles.notificationRow}>
            <View>
              <Text style={styles.notificationTitle}>Đặt phòng mới</Text>
              <Text style={styles.notificationDesc}>Thông báo khi có đặt phòng mới</Text>
            </View>
            <Switch
              value={editedData.notifications.bookings}
              onValueChange={() => toggleNotification('bookings')}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={editedData.notifications.bookings ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationRow}>
            <View>
              <Text style={styles.notificationTitle}>Tin nhắn</Text>
              <Text style={styles.notificationDesc}>Thông báo khi có tin nhắn mới</Text>
            </View>
            <Switch
              value={editedData.notifications.messages}
              onValueChange={() => toggleNotification('messages')}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={editedData.notifications.messages ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationRow}>
            <View>
              <Text style={styles.notificationTitle}>Đánh giá mới</Text>
              <Text style={styles.notificationDesc}>Thông báo khi có đánh giá mới</Text>
            </View>
            <Switch
              value={editedData.notifications.reviews}
              onValueChange={() => toggleNotification('reviews')}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={editedData.notifications.reviews ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.notificationRow}>
            <View>
              <Text style={styles.notificationTitle}>Khuyến mãi</Text>
              <Text style={styles.notificationDesc}>Thông báo về các chương trình khuyến mãi</Text>
            </View>
            <Switch
              value={editedData.notifications.promotions}
              onValueChange={() => toggleNotification('promotions')}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={editedData.notifications.promotions ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {isEditing ? (
            <>
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]}
                onPress={saveProfile}
              >
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => {
                  setEditedData({...profileData});
                  setIsEditing(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.logoutButton]}
                onPress={() => setShowLogoutConfirm(true)}
              >
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Payment Method Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPaymentModal}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm phương thức thanh toán</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Loại tài khoản</Text>
              <View style={styles.paymentTypeButtons}>
                <TouchableOpacity style={[styles.paymentTypeButton, styles.activePaymentType]}>
                  <Text style={styles.activePaymentTypeText}>Ngân hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentTypeButton}>
                  <Text style={styles.paymentTypeText}>Thẻ tín dụng</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Tên ngân hàng</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nhập tên ngân hàng"
              />
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Số tài khoản</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nhập số tài khoản"
                keyboardType="number-pad"
              />
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Tên chủ tài khoản</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nhập tên chủ tài khoản"
              />
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  Alert.alert('Thành công', 'Đã thêm phương thức thanh toán mới!');
                  setShowPaymentModal(false);
                }}
              >
                <Text style={styles.modalButtonText}>Thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowPaymentModal(false)}
              >
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLanguageModal}
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.languageModalContent]}>
            <Text style={styles.modalTitle}>Thêm ngôn ngữ</Text>
            
            <View style={styles.languageOptions}>
              {['Tiếng Pháp', 'Tiếng Trung', 'Tiếng Nhật', 'Tiếng Hàn', 'Tiếng Đức'].map((lang, index) => (
                <TouchableOpacity key={index} style={styles.languageOption}>
                  <Text style={styles.languageOptionText}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.closeModalText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutConfirm}
        onRequestClose={() => setShowLogoutConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmTitle}>Đăng xuất</Text>
            <Text style={styles.confirmText}>Bạn có chắc chắn muốn đăng xuất?</Text>
            
            <View style={styles.confirmActions}>

              
              <TouchableOpacity 
                style={[styles.confirmButton, styles.confirmLogoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmLogoutText}>Đăng xuất</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => setShowLogoutConfirm(false)}
              >
                <Text style={styles.confirmCancelText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editCoverText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B35',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  editAvatarIcon: {
    fontSize: 14,
    color: '#fff',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B35',
    paddingVertical: 4,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e9ecef',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  bioText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  bioInput: {
    fontSize: 14,
    color: '#495057',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoIcon: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#212529',
  },
  infoInput: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B35',
    paddingVertical: 4,
    marginRight: 10,
  },
  verificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verificationText: {
    fontSize: 12,
    fontWeight: '500',
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  languageText: {
    fontSize: 14,
    color: '#495057',
  },
  addLanguageButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  addLanguageText: {
    fontSize: 14,
    color: '#FF6B35',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  paymentIcon: {
    fontSize: 18,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  paymentNumber: {
    fontSize: 12,
    color: '#6c757d',
  },
  defaultBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  addPaymentButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addPaymentText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  notificationDesc: {
    fontSize: 12,
    color: '#6c757d',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    padding: 20,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FF6B35',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  logoutButtonText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: width - 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  paymentTypeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  paymentTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
  },
  activePaymentType: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  paymentTypeText: {
    fontSize: 14,
    color: '#495057',
  },
  activePaymentTypeText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  modalCancelText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
  languageModalContent: {
    maxHeight: '60%',
  },
  languageOptions: {
    marginBottom: 20,
  },
  languageOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  languageOptionText: {
    fontSize: 16,
    color: '#212529',
  },
  closeModalButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmModalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: width - 80,
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  confirmLogoutButton: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  confirmLogoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmCancelText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
  },
});