import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
      key={item}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderDurationOption = (item) => (
    <TouchableOpacity
      style={[styles.option, selectedDuration === item && styles.selectedOption]}
      onPress={() => setSelectedDuration(item)}
      key={item}
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

      {/* Summary */}
      {selectedDate && selectedTime && (
        <View style={styles.summary}>
          <Text>
            Nhận phòng: {selectedTime}, {selectedDate.split('-').reverse().join('/')}
          </Text>
          <Text>
            Trả phòng: {/* TODO: Tính giờ trả phòng */}
          </Text>
        </View>
      )}

      {/* Apply Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Áp dụng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: '#999',
  },
  tabActive: {
    color: '#FF6600',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#FF6600',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#FF6600',
  },
  optionText: {
    color: '#000',
  },
  summary: {
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF6600',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
