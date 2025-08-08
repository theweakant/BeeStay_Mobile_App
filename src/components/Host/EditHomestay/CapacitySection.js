import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from './styles/sharedStyles';

const CapacitySection = ({ 
  formData, 
  errors, 
  renderInput, 
  handleInputChange 
}) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Thông tin sức chứa</Text>
      
      <View style={sharedStyles.row}>
        <View style={sharedStyles.halfInput}>
          {renderInput('Số phòng *', 'roomCount', 'Nhập số phòng', {
            keyboardType: 'numeric'
          })}
        </View>
        <View style={sharedStyles.halfInput}>
          {renderInput('Số khách tối đa *', 'maxGuests', 'Nhập số khách tối đa', {
            keyboardType: 'numeric'
          })}
        </View>
      </View>
      
      <View style={sharedStyles.row}>
        <View style={sharedStyles.halfInput}>
          {renderInput('Số giường *', 'bedCount', 'Nhập số giường', {
            keyboardType: 'numeric'
          })}
        </View>
        <View style={sharedStyles.halfInput}>
          {renderInput('Số phòng tắm *', 'bathroomCount', 'Nhập số phòng tắm', {
            keyboardType: 'numeric'
          })}
        </View>
      </View>
    </View>
  );
};

export default React.memo(CapacitySection);