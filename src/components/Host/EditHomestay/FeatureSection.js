import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native';

const FeatureSection = ({
  formData = {},
  errors = {},
  handleInputChange
}) => {
  // Parse features từ string thành array
  const parseFeatures = (featuresString) => {
    if (!featuresString) return [];
    return featuresString.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  // Parse dates từ string thành array
  const parseDates = (datesString) => {
    if (!datesString) return [];
    return datesString.split(',').map(item => item.trim()).filter(item => item.length > 0);
  };

  const [features, setFeatures] = useState([]);
  const [dates, setDates] = useState([]);

  // Sync với formData khi component mount hoặc data thay đổi
  useEffect(() => {
    console.log('FormData changed:', { 
      features: formData.features, 
      availableDates: formData.availableDates 
    });
    
    setFeatures(parseFeatures(formData.features || ''));
    setDates(parseDates(formData.availableDates || ''));
  }, [formData.features, formData.availableDates]);
  const [editingFeature, setEditingFeature] = useState(null);
  const [editingDate, setEditingDate] = useState(null);
  const [newFeature, setNewFeature] = useState('');
  const [newDate, setNewDate] = useState('');
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);

  // Update parent component khi features thay đổi
  const updateFeatures = useCallback((newFeatures) => {
    const featuresString = newFeatures.join(', ');
    handleInputChange('features', featuresString);
  }, [handleInputChange]);

  // Update parent component khi dates thay đổi
  const updateDates = useCallback((newDates) => {
    const datesString = newDates.join(', ');
    handleInputChange('availableDates', datesString);
  }, [handleInputChange]);

  // Features handlers
  const addFeature = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      updateFeatures(updatedFeatures);
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    updateFeatures(updatedFeatures);
  };

  const updateFeature = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
    updateFeatures(updatedFeatures);
    setEditingFeature(null);
  };

  // Dates handlers
  const addDate = () => {
    if (newDate.trim()) {
      const updatedDates = [...dates, newDate.trim()];
      setDates(updatedDates);
      updateDates(updatedDates);
      setNewDate('');
    }
  };

  const removeDate = (index) => {
    const updatedDates = dates.filter((_, i) => i !== index);
    setDates(updatedDates);
    updateDates(updatedDates);
  };

  const updateDate = (index, value) => {
    const updatedDates = [...dates];
    updatedDates[index] = value;
    setDates(updatedDates);
    updateDates(updatedDates);
    setEditingDate(null);
  };

  const TagEditor = ({ 
    title, 
    items, 
    newItem, 
    setNewItem, 
    addItem, 
    removeItem, 
    updateItem, 
    editingIndex, 
    setEditingIndex,
    placeholder,
    showInput,
    setShowInput,
    isFeature = false
  }) => (
    <View style={styles.tagEditorContainer}>
      {/* Header với label và nút + */}
      <View style={styles.headerContainer}>
        <Text style={styles.label}>{title}</Text>
        <TouchableOpacity
          onPress={() => setShowInput(true)}
          style={styles.headerAddButton}
        >
          <Text style={styles.headerAddButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Tags container */}
      <View style={styles.tagsContainer}>
        {/* Add new tag input - hiển thị ở đầu khi showInput = true */}
        {showInput && (
          <View style={styles.newTagContainer}>
            <TextInput
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={() => {
                addItem();
                setShowInput(false);
              }}
              onBlur={() => {
                if (!newItem.trim()) {
                  setShowInput(false);
                }
              }}
              placeholder={placeholder}
              style={styles.newTagInput}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                addItem();
                setShowInput(false);
              }}
              disabled={!newItem.trim()}
              style={[styles.confirmButton, !newItem.trim() && styles.confirmButtonDisabled]}
            >
              <Text style={[styles.confirmButtonText, !newItem.trim() && styles.confirmButtonTextDisabled]}>
                ✓
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNewItem('');
                setShowInput(false);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tags wrapper - sử dụng flexWrap để các tag tự động xuống dòng */}
        <View style={styles.tagsWrapper}>
          {items.map((item, index) => (
            <View key={index} style={styles.tag}>
              {editingIndex === index ? (
                <TextInput
                  value={item}
                  onChangeText={(text) => {
                    const updatedItems = [...items];
                    updatedItems[index] = text;
                    if (isFeature) {
                      setFeatures(updatedItems);
                    } else {
                      setDates(updatedItems);
                    }
                  }}
                  onBlur={() => updateItem(index, item)}
                  onSubmitEditing={() => updateItem(index, item)}
                  style={styles.editInput}
                  autoFocus
                />
              ) : (
                <TouchableOpacity 
                  onLongPress={() => setEditingIndex(index)}
                  style={styles.tagTextContainer}
                >
                  <Text style={styles.tagText} numberOfLines={1}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => removeItem(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Đặc điểm</Text>

      <TagEditor
        title="Tiện ích nổi bật"
        items={features}
        newItem={newFeature}
        setNewItem={setNewFeature}
        addItem={addFeature}
        removeItem={removeFeature}
        updateItem={updateFeature}
        editingIndex={editingFeature}
        setEditingIndex={setEditingFeature}
        placeholder="View đẹp..."
        showInput={showFeatureInput}
        setShowInput={setShowFeatureInput}
        isFeature={true}
      />

      <TagEditor
        title="Ngày có sẵn"
        items={dates}
        newItem={newDate}
        setNewItem={setNewDate}
        addItem={addDate}
        removeItem={removeDate}
        updateItem={updateDate}
        editingIndex={editingDate}
        setEditingIndex={setEditingDate}
        placeholder="2025-07-25"
        showInput={showDateInput}
        setShowInput={setShowDateInput}
        isFeature={false}
      />

      {/* Error messages */}
      {errors.features && (
        <Text style={styles.errorText}>{errors.features}</Text>
      )}
      {errors.availableDates && (
        <Text style={styles.errorText}>{errors.availableDates}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFA500',
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tagEditorContainer: {
    marginBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginRight: 8,
  },
  headerAddButton: {
    backgroundColor: '#E5E7EB',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAddButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  tagsContainer: {
    minHeight: 40,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginRight: 6,
    marginBottom: 6,
    maxWidth: 140,
  },
  tagTextContainer: {
    flex: 1,
  },
  tagText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
  },
  editInput: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
    minWidth: 40,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  removeButton: {
    marginLeft: 6,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: 'bold',
    lineHeight: 14,
  },
  newTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  newTagInput: {
    fontSize: 12,
    color: '#374151',
    minWidth: 60,
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
  confirmButton: {
    backgroundColor: '#3B82F6',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  confirmButtonTextDisabled: {
    color: '#9CA3AF',
  },
  cancelButton: {
    backgroundColor: '#9CA3AF',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default React.memo(FeatureSection);