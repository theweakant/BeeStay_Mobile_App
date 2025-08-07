import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddReview, clearError, clearSuccess } from '../../../redux/slices/review.slice';

export default function AddReviewSection({ accountId, stayCationId, onReviewSubmitted }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.review);

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Basic validation
    if (!rating || isNaN(rating) || rating < 0 || rating > 5) {
      Alert.alert('Lỗi', 'Vui lòng nhập rating hợp lệ (0 - 5)');
      return;
    }
    if (!comment.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập comment');
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // Format yyyy-mm-dd

    const reviewData = {
      rating: parseFloat(rating),
      comment,
      reviewDate: today
    };

    dispatch(fetchAddReview({ accountId, stayCationId, reviewData }))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Review đã được gửi');
        setRating('');
        setComment('');
        dispatch(clearError());
        dispatch(clearSuccess());
        if (onReviewSubmitted) onReviewSubmitted();
      })
      .catch((err) => {
        console.error('❌ Add review error:', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm review của bạn</Text>

      <TextInput
        style={styles.input}
        placeholder="Rating (0 - 5)"
        keyboardType="decimal-pad"
        value={rating}
        onChangeText={setRating}
      />

      <TextInput
        style={[styles.input, styles.commentInput]}
        placeholder="Nhận xét của bạn"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFA500" />
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>Lỗi: {error}</Text>}
      {success && <Text style={styles.success}>Review thành công!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    color: '#333333',
  },
  commentInput: {
    height: 80,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  sendButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#DC3545',
    marginTop: 8
  },
  success: {
    color: '#28A745',
    marginTop: 8
  },
});