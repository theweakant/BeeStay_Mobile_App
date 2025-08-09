// components/AddStaycationForm/BasicInfoStep.js
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import FormInput from "./shared/FormInput"
import Tag from "./shared/Tag"

const BasicInfoStep = ({ formData, onChange, errors }) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
      </View>

      {/* Form Section Card */}
      <View style={styles.formCard}>
        <FormInput
          label="Tên homestay"
          name="name"
          value={formData.name}
          onChangeText={(value) => onChange("name", value)}
          placeholder="Tên homestay"
          required
          error={errors.name}
        />

        <FormInput
          label="Mô tả chi tiết"
          name="description"
          value={formData.description}
          onChangeText={(value) => onChange("description", value)}
          placeholder="Mô tả chi tiết"
          multiline
          numberOfLines={4}
          required
          error={errors.description}
        />

        <FormInput
          label="Loại phòng"
          name="roomType"
          value={formData.roomType}
          onChangeText={(value) => onChange("roomType", value)}
          placeholder="Nguyên căn, Phòng Riêng, Phòng Đôi"
        />
      </View>

      {/* Features Section */}
      <Tag 
        formData={formData}
        onChange={onChange}
        errors={errors}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Section Header
  sectionHeader: {
    paddingHorizontal:20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#072a74ff',
    lineHeight: 28,
  },
  
  // Form Cards
  formCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
  },
  
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  
  // Features Section
  featuresHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#eba016ff',
    marginBottom: 4,
    lineHeight: 24,
  },
  featuresSubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 16,
  },
  
  // Feature Input Row
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  featureInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    minHeight: 50,
    lineHeight: 22,
  },
  featureInputFilled: {
    borderColor: '#eba016ff',
    borderWidth: 1.5,
    backgroundColor: '#FFFBEB',
  },
  
  // Remove Button
  removeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  removeButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
  },
  
  // Add Button
  addButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
})

export default BasicInfoStep