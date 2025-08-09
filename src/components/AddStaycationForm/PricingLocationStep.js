// components/AddStaycationForm/PricingLocationStep.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormInput from "./shared/FormInput";

const PricingLocationStep = ({ formData, onChange, errors }) => {
  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Giá cả & Địa điểm</Text>
      </View>

      {/* Giá cả */}
      <View style={[styles.section, styles.sectionBordered]}>
        <Text style={styles.sectionTitle}>Thông tin giá</Text>
        <View style={styles.row}>
          <FormInput
            label="Giá mỗi đêm"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChangeText={(value) => onChange("pricePerNight", value)}
            keyboardType="numeric"
            required
            error={errors.pricePerNight}
            containerStyle={styles.flexItem}
          />
          <FormInput
            label="Giá gốc"
            name="originalPricePerNight"
            value={formData.originalPricePerNight}
            onChangeText={(value) => onChange("originalPricePerNight", value)}
            keyboardType="numeric"
            containerStyle={styles.flexItem}
          />
        </View>
        <FormInput
          label="Phần trăm giảm giá"
          name="discountPercentage"
          value={formData.discountPercentage.toString()}
          onChangeText={(value) =>
            onChange("discountPercentage", Number.parseInt(value) || 0)
          }
          keyboardType="numeric"
        />
      </View>

      {/* Địa điểm */}
      <View style={[styles.section, styles.sectionBordered]}>
        <Text style={styles.sectionTitle}>Địa chỉ</Text>
        
        <FormInput
          label="Địa chỉ"
          name="location.address"
          value={formData.location.address}
          onChangeText={(value) => onChange("location.address", value)}
          required
          error={errors["location.address"]}
          containerStyle={styles.inputContainer}
        />
        
        <FormInput
          label="Quận/Huyện"
          name="location.district"
          value={formData.location.district}
          required
          onChangeText={(value) => onChange("location.district", value)}
          containerStyle={styles.inputContainer}
        />
        
        <FormInput
          label="Thành phố"
          name="location.city"
          value={formData.location.city}
          onChangeText={(value) => onChange("location.city", value)}
          required
          error={errors["location.city"]}
          containerStyle={styles.inputContainer}
        />
        
        <FormInput
          label="Tỉnh/Thành"
          name="location.province"
          value={formData.location.province}
          required
          onChangeText={(value) => onChange("location.province", value)}
          containerStyle={styles.inputContainer}
        />
        
        <FormInput
          label="Khoảng cách đến trung tâm (km)"
          name="distanceToCenter"
          value={formData.distanceToCenter.toString()}
          onChangeText={(value) =>
            onChange("distanceToCenter", Number.parseFloat(value) || 0)
          }
          keyboardType="numeric"
          containerStyle={styles.inputContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#072a74ff",
    lineHeight: 28,
  },

  // Section dùng chung
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionBordered: {
    backgroundColor: "transparent",
    borderColor: "#d5d5d5ff",
    borderWidth: 0.5,
  },
  sectionGray: {
    backgroundColor: "#e7ebeeff",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
    color: "#072a74ff", 
  },

  inputContainer: {
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  flexItem: {
    flex: 1,
  },
});

export default PricingLocationStep;