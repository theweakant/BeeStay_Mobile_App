import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const BioSection = ({ profileData, isEditing, editedData, onBioChange }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Giới thiệu</Text>
      {isEditing ? (
        <TextInput
          style={styles.bioInput}
          value={editedData.bio}
          onChangeText={onBioChange}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      ) : (
        <Text style={styles.bioText}>{profileData.bio}</Text>
      )}
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
});

export default BioSection;