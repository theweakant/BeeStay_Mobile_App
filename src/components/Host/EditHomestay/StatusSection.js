import React from 'react';
import { View, Text } from 'react-native';
import { sharedStyles } from './styles/sharedStyles';

const StatusSection = ({ 
  formData, 
  renderSwitch, 
  setFormData 
}) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Cài đặt trạng thái</Text>
      
      <View style={sharedStyles.switchRow}>
        {renderSwitch('Flash Sale', 'isFlashSale')}
        {renderSwitch('Có sẵn', 'isAvailable')}
      </View>
      
      <View style={sharedStyles.switchRow}>
        {renderSwitch('Đặt ngay', 'isInstantBook')}
        {renderSwitch('Đề xuất', 'isRecommended')}
      </View>
    </View>
  );
};

export default React.memo(StatusSection);