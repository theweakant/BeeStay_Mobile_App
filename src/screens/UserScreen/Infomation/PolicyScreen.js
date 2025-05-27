import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { 
  Ionicons, 
  MaterialIcons, 
  AntDesign, 
  Feather 
} from '@expo/vector-icons';
import { PolicyScreenData } from '../../../data/MockData';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../utils/textUtils';


export default function PolicyScreen() {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState({});
  const currentDate = formatDate(new Date());


  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };



  const PolicyCard = ({ item }) => {
    const isExpanded = expandedSections[item.id];
    
    return (
      <View style={styles.policyCard}>
        <TouchableOpacity 
          style={styles.policyHeader}
          onPress={() => toggleSection(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.policyHeaderLeft}>
            <View style={styles.iconContainer}>
              {item.iconFamily === 'Ionicons' && (
                <Ionicons name={item.icon} size={24} color="#F5B041" />
              )}
              {item.iconFamily === 'MaterialIcons' && (
                <MaterialIcons name={item.icon} size={24} color="#F5B041" />
              )}
            </View>
            <View style={styles.policyTitleContainer}>
              <Text style={styles.policyTitle}>{item.title}</Text>
              <Text style={styles.policySummary}>{item.summary}</Text>
            </View>
          </View>
          <View style={styles.expandIcon}>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#C7C7CC" 
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.policyContent}>
            <View style={styles.contentDivider} />
            {item.content.map((point, index) => (
              <View key={index} style={styles.policyPoint}>
                <View style={styles.bulletPoint} />
                <Text style={styles.policyText}>{point}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="policy" size={32} color="#F5B041" />
          </View>
          <Text style={styles.header}>Điều khoản & Chính sách</Text>
          <Text style={styles.subHeader}>
            Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ
          </Text>
        </View>

        {/* Last Updated Info */}
        <View style={styles.updateInfo}>
          <Feather name="clock" size={16} color="#7F8C8D" />
          <Text style={styles.updateText}>
              Cập nhật lần cuối: {currentDate}
          </Text>
        </View>

        {/* Policy Cards */}
        <View style={styles.cardsContainer}>
          {PolicyScreenData.map((item) => (
            <PolicyCard key={item.id} item={item} />
          ))}
        </View>

        {/* Important Notice */}
        <View style={styles.noticeSection}>
          <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              <Ionicons name="information-circle" size={24} color="#FF6B6B" />
            </View>
            <View style={styles.noticeContent}>
              <Text style={styles.noticeTitle}>Lưu ý quan trọng</Text>
              <Text style={styles.noticeText}>
                Việc sử dụng dịch vụ đồng nghĩa với việc bạn đã đọc và đồng ý với 
                tất cả các điều khoản và chính sách trên.
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Cần hỗ trợ thêm?</Text>
            <Text style={styles.contactDescription}>
              Liên hệ với chúng tôi nếu bạn có thắc mắc về các chính sách
            </Text>
            <TouchableOpacity style={styles.contactButton} activeOpacity={0.7} onPress={() => navigation.navigate('Contact')}>
              <MaterialIcons name="support-agent" size={20} color="#fff" />
              <Text style={styles.contactButtonText}>Liên hệ hỗ trợ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header Section
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Update Info
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  updateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },

  // Cards Container
  cardsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },

  // Policy Card
  policyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  policyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  policyTitleContainer: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    lineHeight: 22,
  },
  policySummary: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  expandIcon: {
    marginLeft: 8,
  },

  // Policy Content
  policyContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
  },
  policyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F5B041',
    marginTop: 8,
    marginRight: 12,
  },
  policyText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22,
    flex: 1,
  },

  // Notice Section
  noticeSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  noticeCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  noticeIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  noticeText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },

  // Contact Section
  contactSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#F5B041',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 32,
  },
});