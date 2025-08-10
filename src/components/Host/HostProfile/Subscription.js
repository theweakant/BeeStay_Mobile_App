import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Subscription = ({ host }) => {
  if (!host?.subscription) return null;

  const isActive = host.subscription.status === 'ACTIVE';
  const startDate = new Date(host.subscription.startDate).toLocaleDateString('vi-VN');
  const endDate = new Date(host.subscription.endDate).toLocaleDateString('vi-VN');

  // Calculate days remaining if active
  const daysRemaining = isActive ? Math.ceil((new Date(host.subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Gói đăng ký</Text>
      
      <View style={[styles.subscriptionCard, isActive ? styles.activeCard : styles.inactiveCard]}>
        <View style={styles.subscriptionHeader}>
          <View style={styles.subscriptionInfo}>
            <Text style={styles.subscriptionName}>{host.subscription.name}</Text>
            {isActive && daysRemaining > 0 && (
              <Text style={styles.subscriptionSubtitle}>
                Còn lại {daysRemaining} ngày
              </Text>
            )}
          </View>
          
          <View style={[styles.statusBadge, isActive ? styles.statusActive : styles.statusInactive]}>
            <Text style={styles.statusText}>
              {isActive ? 'HOẠT ĐỘNG' : 'HẾT HẠN'}
            </Text>
          </View>
        </View>

        <View style={styles.subscriptionDates}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>bắt đầu</Text>
            <Text style={styles.dateValue}>{startDate}</Text>
          </View>
          <View style={styles.dateSeparator} />
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>kết thúc</Text>
            <Text style={styles.dateValue}>{endDate}</Text>
          </View>
        </View>

        {/* Progress bar for active subscriptions */}
        {isActive && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Thời gian sử dụng</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {
                width: `${Math.max(0, Math.min(100, 
                  ((new Date() - new Date(host.subscription.startDate)) / 
                   (new Date(host.subscription.endDate) - new Date(host.subscription.startDate))) * 100
                ))}%`
              }]} />
            </View>
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

  // === SUBSCRIPTION CARD ===
  subscriptionCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  activeCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
    shadowColor: 'rgba(16,185,129,0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  inactiveCard: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    shadowColor: 'rgba(239,68,68,0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },

  // === HEADER SECTION ===
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  subscriptionInfo: {
    flex: 1,
    marginRight: 15,
  },
  subscriptionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    fontFamily: '-apple-system',
  },
  subscriptionSubtitle: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
    fontFamily: '-apple-system',
  },

  // === STATUS BADGE ===
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 40,
    minWidth: 80,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusActive: {
    backgroundColor: '#10b981',
  },
  statusInactive: {
    backgroundColor: '#ef4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
  },

  // === DATES SECTION ===
  subscriptionDates: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
  },
  dateValue: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '600',
    fontFamily: '-apple-system',
  },

  // === PROGRESS BAR ===
  progressContainer: {
    marginTop: 20,
  },
  progressLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: '-apple-system',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
});