import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function PickTimeScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);

  const timeOptions = ['17:00', '17:30', '18:00', '18:30'];
  const durationOptions = [1, 2, 3, 4];

  const handleSelectDate = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderTimeOption = (item) => (
    <TouchableOpacity
      style={[styles.option, selectedTime === item && styles.selectedOption]}
      onPress={() => setSelectedTime(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderDurationOption = (item) => (
    <TouchableOpacity
      style={[styles.option, selectedDuration === item && styles.selectedOption]}
      onPress={() => setSelectedDuration(item)}
    >
      <Text style={styles.optionText}>{item} giờ</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.tabActive]}>Theo giờ</Text>
        <Text style={styles.tab}>Qua đêm</Text>
        <Text style={styles.tab}>Theo ngày</Text>
      </View>

      {/* Calendar */}
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        onDayPress={handleSelectDate}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#FF6600' },
        }}
        theme={{
          selectedDayBackgroundColor: '#FF6600',
          todayTextColor: '#FF6600',
          arrowColor: '#FF6600',
        }}
      />

      {/* Time Picker */}
      <Text style={styles.label}>Giờ nhận phòng</Text>
      <View style={styles.optionGroup}>
        {timeOptions.map((item) => renderTimeOption(item))}
      </View>

      {/* Duration Picker */}
      <Text style={styles.label}>Số giờ sử dụng</Text>
      <View style={styles.optionGroup}>
        {durationOptions.map((item) => renderDurationOption(item))}
      </View>

      {/* Summary + Apply */}
      {selectedDate && selectedTime && (
        <View style={styles.summary}>
          <Text>
            Nhận phòng: {selectedTime}, {selectedDate.split('-').reverse().join('/')}
          </Text>
          <Text>
            Trả phòng: {/* tính giờ trả phòng sau nếu cần */}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Áp dụng</Text>
      </TouchableOpacity>
    </View>
  );
}
