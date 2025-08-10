import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const Header = ({ 
  host, 
  isEditing, 
  editedData, 
  updateField, 
  validationErrors 
}) => {
  const displayData = isEditing ? editedData : host;

  return (
    <View style={[styles.profileHeader, isEditing && styles.editableProfileHeader]}>
      <View style={styles.mainContainer}>
        {/* Avatar Section - Left */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {displayData?.name ? displayData.name.charAt(0).toUpperCase() : host?.email?.charAt(0).toUpperCase() || 'H'}
            </Text>
          </View>
        </View>
        
        {/* Info Section - Right */}
        <View style={styles.infoContainer}>
          {/* Name and Host Badge Row */}
          <View style={styles.nameRow}>
            {isEditing ? (
              <View style={styles.nameInputContainer}>
                <TextInput
                  style={[
                    styles.nameInput,
                    validationErrors.name && styles.inputError
                  ]}
                  value={editedData.name}
                  onChangeText={(value) => updateField('name', value)}
                  placeholder="Nhập tên của bạn"
                  placeholderTextColor="#9ca3af"
                />
                {validationErrors.name && (
                  <Text style={styles.errorText}>{validationErrors.name}</Text>
                )}
              </View>
            ) : (
              <Text style={styles.profileName}>{displayData?.name || 'Chủ nhà'}</Text>
            )}
            
            <View style={[styles.hostBadge, host?.superHost ? styles.superHostBadge : styles.regularHostBadge]}>
              <Text style={[styles.hostBadgeText, host?.superHost ? styles.superHostText : styles.regularHostText]}>
                {host?.superHost ? 'Super Host' : 'Host'}
              </Text>
            </View>
          </View>
          
          {/* Phone Display Section */}
          <View style={styles.phoneSection}>
            {isEditing ? (
              <View style={styles.phoneInputContainer}>
                <TextInput
                  style={[
                    styles.phoneInput,
                    validationErrors.phone && styles.inputError
                  ]}
                  value={editedData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  placeholder="Nhập số điện thoại"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
                {validationErrors.phone && (
                  <Text style={styles.errorText}>{validationErrors.phone}</Text>
                )}
              </View>
            ) : (
              <View style={styles.phoneDisplayContainer}>
                <Text style={styles.phoneValue}>
                  {host?.phone || '0902117202'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // === MAIN CONTAINER ===
  profileHeader: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor:'#cececeff',
    paddingVertical: 16 ,
    paddingHorizontal: 30,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  editableProfileHeader: {
    borderWidth: 2,
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
    shadowColor: 'rgba(249,115,22,0.15)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },

  // === AVATAR SECTION ===
  avatarContainer: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 45,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#f97316',
    shadowColor: 'rgba(249,115,22,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#f97316',
    fontFamily: '-apple-system',
  },

  // === INFO SECTION ===
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  // === NAME AND HOST BADGE ROW ===
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
    flexWrap: 'wrap',
    width: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: '-apple-system',
  },

  // === INPUT STYLES ===
  nameInputContainer: {
    alignItems: 'flex-start',
  },
  nameInput: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    minWidth: 180,
    fontFamily: '-apple-system',
  },
  phoneInputContainer: {
    alignItems: 'flex-start',
  },
  phoneInput: {
    fontSize: 16,
    color: '#374151',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    minWidth: 180,
    fontFamily: '-apple-system',
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },

  // === HOST BADGES ===
  hostBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  superHostBadge: {
    backgroundColor: '#fee2e2',
  },
  regularHostBadge: {
    backgroundColor: '#dcfce7',
  },
  hostBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
  },
  superHostText: {
    color: '#dc2626',
  },
  regularHostText: {
    color: '#10b981',
  },

  // === PHONE SECTION ===
  phoneSection: {
    alignItems: 'flex-start',
    width: '100%',
  },
  phoneDisplayContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 0, // 🔥 CHANGED: Bỏ padding horizontal để thẳng hàng với name
    alignSelf: 'flex-start',
  },
  phoneValue: {
    fontSize: 16,
    color: '#999ea5ff',
    fontWeight: '500',
    fontFamily: '-apple-system',
  },

  // === ERROR HANDLING ===
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: '-apple-system',
  },
});