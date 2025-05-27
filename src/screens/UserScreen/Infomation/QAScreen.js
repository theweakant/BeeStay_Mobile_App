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
import { useNavigation } from '@react-navigation/native';
import { QAItems } from '../../../data/MockData';

export default function QAScreen() {
  const [activeCard, setActiveCard] = useState(null);
  const navigation = useNavigation();



  const CategoryBadge = ({ category }) => (
    <View style={styles.categoryBadge}>
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );

  const QACard = ({ item }) => {
    const isActive = activeCard === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.card, isActive && styles.activeCard]}
        onPress={() => setActiveCard(isActive ? null : item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardLeft}>
            <View style={styles.iconContainer}>
              {item.iconFamily === 'Ionicons' && (
                <Ionicons name={item.icon} size={24} color="#F5B041" />
              )}
              {item.iconFamily === 'MaterialIcons' && (
                <MaterialIcons name={item.icon} size={24} color="#F5B041" />
              )}
              {item.iconFamily === 'AntDesign' && (
                <AntDesign name={item.icon} size={24} color="#F5B041" />
              )}
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <CategoryBadge category={item.category} />
            </View>
          </View>
          <View style={styles.expandIcon}>
            <Ionicons 
              name={isActive ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#C7C7CC" 
            />
          </View>
        </View>
        
        {isActive && (
          <View style={styles.answerContainer}>
            <View style={styles.answerDivider} />
            <Text style={styles.answerLabel}>Trả lời:</Text>
            <Text style={styles.answerText}>{item.answer}</Text>
          </View>
        )}
      </TouchableOpacity>
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
          <Text style={styles.header}>Câu hỏi thường gặp</Text>
          <Text style={styles.subHeader}>
            Tìm câu trả lời cho những thắc mắc phổ biến
          </Text>
        </View>

        {/* Search Hint */}
        <View style={styles.searchHint}>
          <Feather name="search" size={16} color="#7F8C8D" />
          <Text style={styles.searchHintText}>
            Gõ từ khóa để tìm kiếm nhanh hơn
          </Text>
        </View>

        {/* QA Cards */}
        <View style={styles.cardsContainer}>
          {QAItems.map((item) => (
            <QACard key={item.id} item={item} />
          ))}
        </View>

        {/* Contact Support Section */}
        <View style={styles.supportSection}>
          <View style={styles.supportCard}>
            <View style={styles.supportIcon}>
              <MaterialIcons name="support-agent" size={32} color="#F5B041" />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Không tìm thấy câu trả lời?</Text>
              <Text style={styles.supportDescription}>
                Liên hệ với đội ngũ hỗ trợ của chúng tôi
              </Text>
            </View>
            <TouchableOpacity style={styles.contactButton} activeOpacity={0.7} onPress={() => navigation.navigate('Contact')}>
              <Text style={styles.contactButtonText}>Liên hệ</Text>
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
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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

  // Search Hint
  searchHint: {
    flexDirection: 'row',
    alignItems: 'center',
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
  searchHintText: {
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

  // Card Styles
  card: {
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
  activeCard: {
    borderWidth: 2,
    borderColor: '#F5B041',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 8,
  },
  expandIcon: {
    marginLeft: 8,
  },

  // Category Badge
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },

  // Answer Section
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answerDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F5B041',
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22,
  },

  // Support Section
  supportSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  supportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
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
  supportIcon: {
    marginRight: 16,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#F5B041',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 32,
  },
});