import React from 'react';
import { View, Text, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sharedStyles } from './styles/sharedStyles';

const AmenitySection = ({ 
  formData, 
  setFormData 
}) => {
  
  const renderIconSwitch = (iconName, field) => {
    const keys = field.split('.');
    const value = keys.reduce((acc, key) => acc?.[key], formData);

    return (
      <View style={sharedStyles.iconSwitchItem}>
        <Icon name={iconName} size={28} color="#333" />
        <Switch
          value={value}
          onValueChange={(val) => {
            setFormData(prev => {
              const updated = { ...prev };
              let target = updated;
              for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]];
              }
              target[keys[keys.length - 1]] = val;
              return updated;
            });
          }}
        />
      </View>
    );
  };

  return (
    <>
      {/* Amenities */}
      <View style={sharedStyles.section}>
        <Text style={sharedStyles.sectionTitle}>Tiện nghi</Text>

        {/* Hàng 1 */}
        <View style={sharedStyles.iconSwitchRow}>
          {renderIconSwitch('wifi', 'amenities.wifi')}
          {renderIconSwitch('air-conditioner', 'amenities.airConditioner')}
          {renderIconSwitch('stove', 'amenities.kitchen')}
        </View>

        {/* Hàng 2 */}
        <View style={sharedStyles.iconSwitchRow}>
          {renderIconSwitch('shower', 'amenities.privateBathroom')}
          {renderIconSwitch('pool', 'amenities.pool')}
          {renderIconSwitch('dog', 'amenities.petAllowed')}
        </View>

        {/* Hàng 3 */}
        <View style={sharedStyles.iconSwitchRow}>
          {renderIconSwitch('car', 'amenities.parking')}
          {renderIconSwitch('balcony', 'amenities.balcony')}
          {renderIconSwitch('grill', 'amenities.bbqArea')}
        </View>

        {/* Hàng 4 - còn 2 cái */}
        <View style={sharedStyles.iconSwitchRow}>
          {renderIconSwitch('room-service', 'amenities.roomService')}
          {renderIconSwitch('security', 'amenities.securityCamera')}
        </View>
      </View>

      {/* Policies */}
      <View style={sharedStyles.section}>
        <Text style={sharedStyles.sectionTitle}>Chính sách</Text>
        <View style={sharedStyles.switchRow}>
          {renderIconSwitch('dog', 'policies.allowPet')}
          {renderIconSwitch('smoking', 'policies.allowSmoking')}
          {renderIconSwitch('cash-refund', 'policies.refundable')}
        </View>
      </View>
    </>
  );
};

export default React.memo(AmenitySection);