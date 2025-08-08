import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from './styles/sharedStyles';

const InformationSection = ({ 
  formData, 
  errors, 
  renderInput, 
  handleInputChange,
  homestay 
}) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Thông tin cơ bản</Text>

      {/* Hàng 1 */}
      <View style={sharedStyles.row}>
        <View style={sharedStyles.halfInput}>
          {renderInput('Tên homestay *', 'name', 'Nhập tên homestay')}
        </View>
        <View style={sharedStyles.halfInput}>
          {renderInput('Loại phòng', 'roomType', 'Standard, Deluxe, Suite, ...')}
        </View>
      </View>

      {/* Hàng 2 */}
      <View style={sharedStyles.fullInput}>
        {renderInput('Mô tả *', 'description', 'Nhập mô tả về homestay', {
          multiline: true,
          numberOfLines: 4
        })}
      </View>
    </View>
  );
};

export default React.memo(InformationSection);