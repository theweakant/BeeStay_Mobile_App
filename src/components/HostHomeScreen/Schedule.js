import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Schedule = ({ schedule }) => {
  return (
    <View style={styles.scheduleContainer}>
      {schedule.map((item, index) => (
        <View 
          key={index} 
          style={[
            styles.scheduleItem,
            index === schedule.length - 1 && styles.scheduleItemLast
          ]}
        >
          <View style={styles.scheduleTime}>
            <Text style={styles.timeText}>{item.time}</Text>
            <View style={[
              styles.statusDot,
              { backgroundColor: item.status === 'check-in' ? '#4CAF50' : '#FF9800' }
            ]} />
          </View>
          <View style={styles.scheduleContent}>
            <Text style={styles.guestName}>{item.guestName}</Text>
            <Text style={styles.peopleCount}>{item.people}</Text>
            <Text style={styles.statusText}>
              {item.status === 'check-in' ? 'Nhận phòng' : 'Trả phòng'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scheduleItemLast: {
    borderBottomWidth: 0,
  },
  scheduleTime: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scheduleContent: {
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  peopleCount: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

export default Schedule;
