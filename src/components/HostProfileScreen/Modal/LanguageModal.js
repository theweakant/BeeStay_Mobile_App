import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const availableLanguages = [
  'Tiếng Pháp',
  'Tiếng Trung',
  'Tiếng Nhật', 
  'Tiếng Hàn',
  'Tiếng Đức',
  'Tiếng Tây Ban Nha',
  'Tiếng Ý',
  'Tiếng Nga',
  'Tiếng Thái',
  'Tiếng Indonesia'
];

export default function LanguageModal({ visible, onClose, onSelectLanguage, currentLanguages = [] }) {
  const handleSelectLanguage = (language) => {
    if (currentLanguages.includes(language)) {
      // Language already selected, could show a message or do nothing
      return;
    }
    
    if (onSelectLanguage) {
      onSelectLanguage(language);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, styles.languageModalContent]}>
          <Text style={styles.modalTitle}>Thêm ngôn ngữ</Text>
          
          <ScrollView style={styles.languageOptions} showsVerticalScrollIndicator={false}>
            {availableLanguages.map((language, index) => {
              const isAlreadySelected = currentLanguages.includes(language);
              
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.languageOption,
                    isAlreadySelected && styles.selectedLanguageOption
                  ]}
                  onPress={() => handleSelectLanguage(language)}
                  disabled={isAlreadySelected}
                >
                  <Text style={[
                    styles.languageOptionText,
                    isAlreadySelected && styles.selectedLanguageText
                  ]}>
                    {language}
                  </Text>
                  {isAlreadySelected && (
                    <Text style={styles.selectedIndicator}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.closeModalButton}
            onPress={onClose}
          >
            <Text style={styles.closeModalText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  languageModalContent: {
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOptions: {
    marginBottom: 20,
    maxHeight: 300,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  selectedLanguageOption: {
    backgroundColor: '#f8f9fa',
    opacity: 0.6,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#212529',
  },
  selectedLanguageText: {
    color: '#6c757d',
  },
  selectedIndicator: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
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
});