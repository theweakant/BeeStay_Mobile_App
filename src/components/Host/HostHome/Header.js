import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ host }) => {
  if (!host) return null;

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Top Section - Welcome & Status */}
        <View style={styles.topSection}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.greetingText}>Chào bạn,</Text>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>
                {host.name || 'chủ nhà'}!
              </Text>
              <View style={styles.statusBadge}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: host.superHost ? '#10B981' : '#EF4444' }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: host.superHost ? '#10B981' : '#EF4444' }
                ]}>
                  {host.superHost ? 'Super Host' : 'Host'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Section - Location & Management */}
        <View style={styles.bottomSection}>
          <View style={styles.locationContainer}>
          <Image 
            source={require("../../../../assets/Logo/beestay-logo.png")}
            style={styles.locationIcon}
          />
            <Text style={styles.locationText}>
              Quản lý BeeStay tại {host.location?.province || 'Việt Nam'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerContent: {
    gap: 16,
  },
  topSection: {
    gap: 8,
  },
  welcomeContainer: {
    gap: 4,
  },
  greetingText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationIcon: {
    width: 36,        
    height:36,  
    borderColor: '#a8a8a8ff',
    borderWidth:1,
    borderRadius:50,
    backgroundColor:'#eaecefff'     
  },
  locationText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
  },
});

export default Header;