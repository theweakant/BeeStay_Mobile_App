import React from 'react';
import { View, Text } from 'react-native';
import UploadImage from '../../../components/UploadImage';
import UploadVideo from '../../../components/UploadVideo';
import { sharedStyles } from './styles/sharedStyles';

const UploadSection = ({ homestay }) => {
  return (
    <View style={sharedStyles.section}>
      <Text style={sharedStyles.sectionTitle}>Tải lên media</Text>
      
      <View style={sharedStyles.uploadSection}>
        <Text style={sharedStyles.inputLabel}>Hình ảnh</Text>
        <View style={sharedStyles.uploadContainer}>
          <UploadImage 
            homestayId={homestay?.id} 
            homestay={homestay} 
          />
        </View>
      </View>

      <View style={sharedStyles.uploadSection}>
        <Text style={sharedStyles.inputLabel}>Video</Text>
        <View style={sharedStyles.uploadContainer}>
          <UploadVideo homestayId={homestay?.id} />
        </View>
      </View>
    </View>
  );
};

export default React.memo(UploadSection);