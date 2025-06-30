import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';

const Section = ({ title, children, style, rightComponent }) => {
  return (
    <View style={[styles.section, style]}>
      <SectionHeader title={title} rightComponent={rightComponent} />
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