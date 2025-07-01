import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SuccessBooking() {
    const navigation = useNavigation();

    const handleNavigateToOrderBooking = () => {
        navigation.navigate('OrderBooking');
    };

    const handleBackToHome = () => {
        navigation.navigate('Home'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.successIcon}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Đặt lịch thành công!</Text>
                <Text style={styles.subtitle}>
                    Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ liên hệ với bạn sớm nhất.
                </Text>

                {/* Booking Details Card */}
                <View style={styles.detailsCard}>
                    <Text style={styles.cardTitle}>Chi tiết đặt lịch</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Mã đặt lịch:</Text>
                        <Text style={styles.detailValue}>#BK001234</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Thời gian:</Text>
                        <Text style={styles.detailValue}>10:00 - 25/12/2024</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Trạng thái:</Text>
                        <Text style={[styles.detailValue, styles.statusConfirmed]}>
                            Đã xác nhận
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.primaryButton}
                        onPress={handleNavigateToOrderBooking}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>
                            Xem đơn đặt lịch
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.secondaryButton}
                        onPress={handleBackToHome}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Về trang chủ
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    iconContainer: {
        marginBottom: 32,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    checkmark: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    detailsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    detailLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        color: '#2c3e50',
        fontWeight: '600',
    },
    statusConfirmed: {
        color: '#27ae60',
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#3498db',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#3498db',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#bdc3c7',
    },
    secondaryButtonText: {
        color: '#7f8c8d',
        fontSize: 16,
        fontWeight: '600',
    },
});