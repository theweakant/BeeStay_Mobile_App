// components/AddStaycationForm/shared/Tag.js

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const Tag = ({
  formData = {},
  onChange,
  errors = {}
}) => {
  const [features, setFeatures] = useState([]);
  const [editingFeature, setEditingFeature] = useState(null);
  const [newFeature, setNewFeature] = useState('');
  const [showFeatureInput, setShowFeatureInput] = useState(false);

  // Sync với formData khi component mount hoặc data thay đổi
  useEffect(() => {
    const currentFeatures = formData.features || [];
    if (Array.isArray(currentFeatures)) {
      setFeatures(currentFeatures.filter(f => f && f.trim()));
    }
  }, [formData.features]);

  // Update parent component khi features thay đổi
  const updateFeatures = useCallback((newFeatures) => {
    const cleanFeatures = newFeatures.filter(f => f && f.trim());
    onChange('features', cleanFeatures);
  }, [onChange]);

  // Features handlers
  const addFeature = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      updateFeatures(updatedFeatures);
      setNewFeature('');
      setShowFeatureInput(false);
    }
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    updateFeatures(updatedFeatures);
  };

  const updateFeature = (index, value) => {
    if (value.trim()) {
      const updatedFeatures = [...features];
      updatedFeatures[index] = value.trim();
      setFeatures(updatedFeatures);
      updateFeatures(updatedFeatures);
    }
    setEditingFeature(null);
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
    errorMessage
  }) => (
    <View style={styles.tagEditorContainer}>
      {/* Header với label và nút + */}
      <View style={styles.headerContainer}>
        <Text style={styles.label}>{title}</Text>
        <TouchableOpacity
          onPress={() => setShowInput(true)}
          style={styles.headerAddButton}
          activeOpacity={0.7}
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
              }}
              onBlur={() => {
                if (!newItem.trim()) {
                  setShowInput(false);
                }
              }}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              style={styles.newTagInput}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                addItem();
              }}
              disabled={!newItem.trim()}
              style={[styles.confirmButton, !newItem.trim() && styles.confirmButtonDisabled]}
              activeOpacity={0.8}
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
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tags wrapper - sử dụng flexWrap để các tag tự động xuống dòng */}
        <View style={styles.tagsWrapper}>
          {items.length === 0 && !showInput && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Chưa có tính năng nào</Text>
              <Text style={styles.emptyStateSubtext}>Nhấn + để thêm tính năng</Text>
            </View>
          )}
          
          {items.map((item, index) => (
            <View key={index} style={styles.tag}>
              {editingIndex === index ? (
                <TextInput
                  value={item}
                  onChangeText={(text) => {
                    const updatedItems = [...items];
                    updatedItems[index] = text;
                    setFeatures(updatedItems);
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
                  activeOpacity={0.7}
                >
                  <Text style={styles.tagText} numberOfLines={1}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => removeItem(index)}
                style={styles.removeButton}
                activeOpacity={0.7}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      
      {/* Error message */}
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TagEditor
        title="Đặc điểm nổi bật"
        items={features}
        newItem={newFeature}
        setNewItem={setNewFeature}
        addItem={addFeature}
        removeItem={removeFeature}
        updateItem={updateFeature}
        editingIndex={editingFeature}
        setEditingIndex={setEditingFeature}
        placeholder="View đẹp, Gần biển..."
        showInput={showFeatureInput}
        setShowInput={setShowFeatureInput}
        errorMessage={errors.features}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
  },
  
  tagEditorContainer: {
    marginBottom: 8,
  },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#eba016ff',
    flex: 1,
  },
  
  headerAddButton: {
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  
  headerAddButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  
  tagsContainer: {
    minHeight: 60,
  },
  
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  emptyStateSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf2faff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginRight: 8,
    marginBottom: 8,
    maxWidth: 120,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  tagTextContainer: {
    flex: 1,
  },
  
  tagText: {
    fontSize: 13,
    color: '#1E40AF',
    fontWeight: '500',
  },
  
  editInput: {
    fontSize: 13,
    color: '#1E40AF',
    fontWeight: '500',
    minWidth: 60,
    paddingVertical: 0,
    paddingHorizontal: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  
  removeButton: {
    marginLeft: 8,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 9,
  },
  
  removeButtonText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: 'bold',
    lineHeight: 12,
  },
  
  newTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f2ffff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  newTagInput: {
    fontSize: 13,
    color: '#374151',
    minWidth: 80,
    paddingVertical: 0,
    paddingHorizontal: 4,
    flex: 1,
  },
  
  confirmButton: {
    backgroundColor: '#059669',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  
  confirmButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  
  confirmButtonTextDisabled: {
    color: '#9CA3AF',
  },
  
  cancelButton: {
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default React.memo(Tag);