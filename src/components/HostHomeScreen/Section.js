import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';

const Section = ({ title, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <SectionHeader title={title} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
});

export default Section;
