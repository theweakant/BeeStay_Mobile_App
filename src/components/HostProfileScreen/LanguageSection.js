// components/LanguageSection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const LanguageSection = ({ profileData, setShowLanguageModal }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
});