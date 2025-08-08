import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from './styles/sharedStyles';

const PriceSection = ({ 
  formData, 
  errors, 
  renderInput, 
  handleInputChange 
}) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Thông tin giá</Text>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.half}>
          {renderInput(
            'Giá hiện tại*',
            'pricePerNight',
            'Nhập giá hiện tại',
            { keyboardType: 'numeric' }
          )}
        </View>
        <View style={sharedStyles.half}>
          {renderInput(
            'Giá gốc*',
            'originalPricePerNight',
            'Nhập giá gốc (nếu có giảm giá)',
            { keyboardType: 'numeric' }
          )}
        </View>
      </View>

      {renderInput(
        '% Giảm giá',
        'discountPercentage',
        'Tự động tính nếu để trống',
        { keyboardType: 'numeric' }
      )}
    </View>
  );
};

export default React.memo(PriceSection);