import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Information = ({ host }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusInfo = (status) => {
    if (status === 'active') {
      return {
        text: 'Hoạt động',
        color: '#10b981',
        backgroundColor: '#dcfce7',
        borderColor: '#bbf7d0'
      };
    } else {
      return {
        text: 'Tạm ngưng',
        color: '#ef4444',
        backgroundColor: '#fee2e2',
        borderColor: '#fecaca'
      };
    }
  };

  const statusInfo = getStatusInfo(host?.status);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Thông tin bổ sung</Text>
      
      <View style={styles.contactContainer}>
        {/* Email */}
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Email</Text>
          <View style={styles.displayValueContainer}>
            <Text style={[styles.contactValue, styles.emailValue]} numberOfLines={1}>
              {host?.email || 'Chưa cập nhật'}
            </Text>
          </View>
        </View>

        {/* Status */}
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Trạng thái</Text>
          <View style={[styles.statusBadge, {
            backgroundColor: statusInfo.backgroundColor,
            borderColor: statusInfo.borderColor
          }]}>
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>

        {/* Join Date */}
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Tham gia từ</Text>
          <View style={styles.displayValueContainer}>
            <Text style={styles.contactValue}>
              {formatDate(host?.joinedDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // === MAIN CONTAINER ===
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },

  // === SECTION HEADER ===
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
    fontFamily: '-apple-system',
  },

  // === CONTACT CONTAINER ===
  contactContainer: {
    gap: 16,
  },

  // === CONTACT ITEMS ===
  contactItem: {
    flex: 1,
  },

  // === LABELS ===
  contactLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
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

  // === VALUES ===
  contactValue: {
    fontSize: 12,
    color: '#4b5563',
    fontFamily: '-apple-system',
  },
  emailValue: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },

  // === STATUS BADGE ===
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 4,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: '-apple-system',
  },
});