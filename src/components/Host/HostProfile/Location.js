import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const Location = ({ 
  host, 
  isEditing, 
  editedData, 
  updateLocationField 
}) => {
  const displayData = isEditing ? editedData : host;

  return (
    <View style={[styles.section, isEditing && styles.editableSection]}>
      <Text style={styles.sectionTitle}>
        Địa chỉ {isEditing && <Text style={styles.editIndicator}></Text>}
      </Text>
      
      <View style={styles.addressContainer}>
        <View style={styles.addressRow}>
          <View style={styles.addressField}>
            <Text style={styles.inputLabel}>Địa chỉ</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.location?.address}
                onChangeText={(value) => updateLocationField('address', value)}
                placeholder="Số nhà, tên đường"
                placeholderTextColor="#9ca3af"
              />
            ) : (
              <View style={styles.displayValueContainer}>
                <Text style={styles.inputValue}>
                  {displayData?.location?.address || 'Chưa cập nhật'}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.addressField}>
            <Text style={styles.inputLabel}>Quận/Huyện</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.location?.district}
                onChangeText={(value) => updateLocationField('district', value)}
                placeholder="Quận/Huyện"
                placeholderTextColor="#9ca3af"
              />
            ) : (
              <View style={styles.displayValueContainer}>
                <Text style={styles.inputValue}>
                  {displayData?.location?.district || 'Chưa cập nhật'}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.addressRow}>
          <View style={styles.addressField}>
            <Text style={styles.inputLabel}>Thành phố</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.location?.city}
                onChangeText={(value) => updateLocationField('city', value)}
                placeholder="Thành phố"
                placeholderTextColor="#9ca3af"
              />
            ) : (
              <View style={styles.displayValueContainer}>
                <Text style={styles.inputValue}>
                  {displayData?.location?.city || 'Chưa cập nhật'}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.addressField}>
            <Text style={styles.inputLabel}>Tỉnh/Thành</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.location?.province}
                onChangeText={(value) => updateLocationField('province', value)}
                placeholder="Tỉnh/Thành phố"
                placeholderTextColor="#9ca3af"
              />
            ) : (
              <View style={styles.displayValueContainer}>
                <Text style={styles.inputValue}>
                  {displayData?.location?.province || 'Chưa cập nhật'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Full Address as a regular input field */}
        {!isEditing && (displayData?.location?.address || displayData?.location?.district || 
                        displayData?.location?.city || displayData?.location?.province) && (
          <View style={styles.addressField}>
            <Text style={styles.inputLabel}>Địa chỉ đầy đủ</Text>
            <View style={styles.displayValueContainer}>
              <Text style={styles.inputValue}>
                {[
                  displayData?.location?.address,
                  displayData?.location?.district,
                  displayData?.location?.city,
                  displayData?.location?.province
                ].filter(Boolean).join(', ')}
              </Text>
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

  // === ADDRESS CONTAINER ===
  addressContainer: {
    gap: 16,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  addressField: {
    flex: 1,
  },

  // === INPUT FIELDS ===
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
});