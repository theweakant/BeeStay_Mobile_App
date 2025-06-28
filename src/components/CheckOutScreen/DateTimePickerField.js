import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerField = ({ label, value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      // Preserve time from previous value
      const current = value || new Date();
      newDate.setHours(current.getHours());
      newDate.setMinutes(current.getMinutes());
      onChange(newDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(value || new Date());
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      onChange(newDate);
    }
  };

  const displayValue = value ? value.toLocaleString() : 'Chọn ngày giờ';

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</Text>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            setShowDatePicker(true);
          } else {
            setShowDatePicker(true);
          }
        }}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          backgroundColor: '#fff',
        }}
      >
        <Text>{displayValue}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={handleTimeChange}
        />
      )}

      {Platform.OS === 'android' && (
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={{
            marginTop: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
            backgroundColor: '#fff',
          }}
        >
          <Text>Chọn giờ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DateTimePickerField;
