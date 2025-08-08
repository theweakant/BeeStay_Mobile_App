
import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from './styles/sharedStyles';

const LocationSection = ({ 
  formData, 
  errors, 
  renderInput, 
  handleInputChange 
}) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Thông tin địa chỉ</Text>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.half}>
          {renderInput('Địa chỉ *', 'location.address', 'Nhập địa chỉ cụ thể')}
        </View>
        <View style={sharedStyles.half}>
          {renderInput('Quận/Huyện *', 'location.district', 'Nhập quận/huyện')}
        </View>
      </View>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.half}>
          {renderInput('Thành phố *', 'location.city', 'Nhập thành phố')}
        </View>
        <View style={sharedStyles.half}>
          {renderInput('Tỉnh/Thành phố *', 'location.province', 'Nhập tỉnh/thành phố')}
        </View>
      </View>

      <View style={sharedStyles.row}>
        <View style={sharedStyles.half}>
          {renderInput('Khoảng cách đến trung tâm (km)', 'distanceToCenter', 'Nhập khoảng cách', {
            keyboardType: 'numeric',
          })}
        </View>
        <View style={sharedStyles.half} />
      </View>
    </View>
  );
};

export default React.memo(LocationSection);