// components/BarChart.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getChartTotal } from '../../utils/formatUtils';
import { chartLegendData } from '../../data/MockData';

const BarChart = ({ monthlyData, onCategoryFilter }) => {
  const maxValue = Math.max(...monthlyData.map(getChartTotal));

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Thu nhập theo thời gian</Text>
      
      {/* Y-axis labels */}
      <View style={styles.yAxisContainer}>
        {[8, 6, 4, 2, 0].map(value => (
          <Text key={value} style={styles.yAxisLabel}>{value}M</Text>
        ))}
      </View>

      {/* Chart bars */}
      <View style={styles.chartBars}>
        {monthlyData.map((data, index) => {
          const total = getChartTotal(data);
          const barHeight = (total / maxValue) * 120;
          
          return (
            <View key={index} style={styles.barContainer}>
              <View style={[styles.bar, { height: barHeight }]}>
                <View style={[styles.barSegment, { 
                  height: (data.food / total) * barHeight, 
                  backgroundColor: '#3B82F6' 
                }]} />
                <View style={[styles.barSegment, { 
                  height: (data.drink / total) * barHeight, 
                  backgroundColor: '#F59E0B' 
                }]} />
                <View style={[styles.barSegment, { 
                  height: (data.snack / total) * barHeight, 
                  backgroundColor: '#EF4444' 
                }]} />
                <View style={[styles.barSegment, { 
                  height: (data.dessert / total) * barHeight, 
                  backgroundColor: '#10B981' 
                }]} />
              </View>
              <Text style={styles.xAxisLabel}>{data.month}</Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {chartLegendData.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.legendItem}
            onPress={() => onCategoryFilter(item.label.toLowerCase())}
          >
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  yAxisContainer: {
    position: 'absolute',
    left: 0,
    top: 60,
    height: 120,
    justifyContent: 'space-between',
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    marginLeft: 30,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 30,
    backgroundColor: 'transparent',
    marginBottom: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barSegment: {
    width: '100%',
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#495057',
  },
});

export default BarChart;