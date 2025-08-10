import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export const Bio = ({ 
  host, 
  isEditing, 
  editedData, 
  updateField,
  newSocialLink,
  setNewSocialLink,
  addSocialLink,
  removeSocialLink
}) => {
  const displayData = isEditing ? editedData : host;

  return (
    <View style={[styles.section, isEditing && styles.editableSection]}>
      <Text style={styles.sectionTitle}>
        Giới thiệu & Mạng xã hội {isEditing && <Text style={styles.editIndicator}></Text>}
      </Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Giới thiệu</Text>
        {isEditing ? (
          <TextInput
            style={[styles.textInput, styles.bioInput]}
            value={editedData.bio}
            onChangeText={(value) => updateField('bio', value)}
            placeholder="Viết vài dòng giới thiệu về bản thân..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
          />
        ) : (
          <View style={styles.displayValueContainer}>
            <Text style={styles.inputValue}>{displayData?.bio || 'Chưa có thông tin giới thiệu'}</Text>
          </View>
        )}
      </View>

      {/* Social Links */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Liên kết mạng xã hội</Text>
        
        {displayData?.socialLinks && displayData.socialLinks.length > 0 ? (
          <View style={styles.socialLinksDisplay}>
            {(isEditing ? displayData.socialLinks : displayData.socialLinks.slice(0, 3)).map((link, index) => (
              <View key={index} style={styles.socialLinkItem}>
                <View style={styles.socialLinkInfo}>
                  <Text style={styles.socialPlatform}>{link.platform}</Text>
                  <Text style={styles.socialUrl} numberOfLines={1}>
                    {link.url}
                  </Text>
                </View>
                {isEditing && (
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeSocialLink(index)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {!isEditing && displayData.socialLinks.length > 3 && (
              <View style={styles.moreLinksIndicator}>
                <Text style={styles.moreLinksText}>
                  +{displayData.socialLinks.length - 3} liên kết khác
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.displayValueContainer}>
            <Text style={styles.inputValue}>Chưa liên kết nền tảng xã hội</Text>
          </View>
        )}

        {/* Add Social Link in Edit Mode */}
        {isEditing && (
          <View style={styles.addSocialContainer}>
            <View style={styles.addSocialRow}>
              <TextInput
                style={[styles.textInput, styles.socialPlatformInput]}
                value={newSocialLink.platform}
                onChangeText={(value) => setNewSocialLink(prev => ({ ...prev, platform: value }))}
                placeholder="Platform (Facebook, Instagram...)"
                placeholderTextColor="#9ca3af"
              />
              <TextInput
                style={[styles.textInput, styles.socialUrlInput]}
                value={newSocialLink.url}
                onChangeText={(value) => setNewSocialLink(prev => ({ ...prev, url: value }))}
                placeholder="https://..."
                placeholderTextColor="#9ca3af"
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity 
              style={styles.addSocialButton} 
              onPress={addSocialLink}
            >
              <Text style={styles.addSocialButtonText}>+ Thêm liên kết</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // === MAIN CONTAINER ===
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    borderRadius: 16,
    padding: 20,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  editableSection: {
    borderWidth: 2,
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
    shadowColor: 'rgba(249,115,22,0.15)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },

  // === SECTION HEADER ===
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
    fontFamily: '-apple-system',
  },
  editIndicator: {
    fontSize: 16,
    color: '#f97316',
    fontWeight: '600',
  },

  // === INPUT FIELDS ===
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system',
    minHeight: 48,
  },
  bioInput: {
    height: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
  },

  // === DISPLAY VALUES ===
  displayValueContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 48,
    justifyContent: 'center',
  },
  inputValue: {
    fontSize: 12,
    color: '#4b5563',
    fontFamily: '-apple-system',
  },

  // === SOCIAL LINKS DISPLAY ===
  socialLinksDisplay: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  socialLinkItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialLinkInfo: {
    flex: 1,
    marginRight: 12,
  },
  socialPlatform: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 2,
    fontFamily: '-apple-system',
  },
  socialUrl: {
    fontSize: 12,
    color: '#3b82f6',
    textDecorationLine: 'underline',
    fontFamily: '-apple-system',
  },

  // === REMOVE BUTTON ===
  removeButton: {
    backgroundColor: '#fee2e2',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  removeButtonText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },

  // === ADD SOCIAL SECTION ===
  addSocialContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  addSocialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  socialPlatformInput: {
    flex: 2,
    fontSize: 14,
    minHeight: 40,
  },
  socialUrlInput: {
    flex: 3,
    fontSize: 14,
    minHeight: 40,
  },
  addSocialButton: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: 'rgba(16,185,129,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  addSocialButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: '-apple-system',
  },

  // === MORE LINKS INDICATOR ===
  moreLinksIndicator: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  moreLinksText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    fontStyle: 'italic',
    fontFamily: '-apple-system',
  },
});