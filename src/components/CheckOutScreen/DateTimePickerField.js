import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerField = ({ label, value, onChange, style }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const currentValue = value || new Date();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(currentValue.getHours());
      newDate.setMinutes(currentValue.getMinutes());
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      onChange(newDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(currentValue);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      onChange(newDate);
    }
  };

  const formatDateShort = (date) => {
    if (!date) return 'Chọn ngày';
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => setShowDatePicker(true)}
      activeOpacity={0.7}
    >
      {/* Label */}
      <Text style={styles.label}>{label}</Text>
      
      {/* Date Display */}
      <Text style={styles.dateText}>
        {formatDateShort(currentValue)}
      </Text>

      {/* Time Display - chỉ hiển thị nếu cần */}
      {formatTime(currentValue) !== '00:00' && (
        <TouchableOpacity
          style={styles.timeButton}
          onPress={(e) => {
            e.stopPropagation();
            setShowTimePicker(true);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.timeText}>
            {formatTime(currentValue)}
          </Text>
        </TouchableOpacity>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={currentValue}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
          locale="vi-VN"
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={currentValue}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={handleTimeChange}
          locale="vi-VN"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '400',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF', // Màu xanh như trong hình
    textAlign: 'center',
    lineHeight: 20,
  },
  timeButton: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default DateTimePickerField;