// components/AddStaycationForm/shared/FormInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const FormInput = ({
  label,
  name,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  required = false,
  error,
  focused,
  containerStyle  
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredMark}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && { height: numberOfLines * 20 },
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#9CA3AF"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#eba016ff',
    marginBottom: 8,


  },
  requiredMark: {
    color: "#eba016ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 12,
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  inputFocused: {
    borderColor: "#3B82F6",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormInput;
