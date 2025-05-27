import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { UserData} from '../../../data/MockData'; 
import { formatDate, getFullAddress } from '../../../utils/textUtils';

export default function ProfileScreen() {

    const user = UserData && UserData.length > 0 ? UserData[0] : null;
    
    // Debug
    console.log('UserData:', UserData);
    console.log('Current user:', user);
    
    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Không có dữ liệu người dùng</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image 
                        source={{ uri: user.avatar }} 
                        style={styles.avatar}
                        defaultSource={require('../../../../assets/Avatar/default-avatar.jpg')} 
                    />
                    {user.isVerified && (
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>✓</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <View style={styles.statusContainer}>
                    <View style={[styles.statusBadge, user.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
                        <Text style={styles.statusText}>
                            {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.currentBooking}</Text>
                    <Text style={styles.statLabel}>Đang đặt</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.totalBookingSuccess}</Text>
                    <Text style={styles.statLabel}>Đã hoàn thành</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.favoriteHomestays?.length || 0}</Text>
                    <Text style={styles.statLabel}>Yêu thích</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.reviewCount}</Text>
                    <Text style={styles.statLabel}>Đánh giá</Text>
                </View>
            </View>

            {/* Personal Information Section */}
            <View style={styles.section}>
                <View>
                    <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
                    <Text>Icon Edit</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Số điện thoại:</Text>
                    <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Giới tính:</Text>
                    <Text style={styles.infoValue}>
                        {user.gender === 'female' ? 'Nữ' : 'Nam'}
                    </Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày sinh:</Text>
                    <Text style={styles.infoValue}>{formatDate(user.birthDate)}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Địa chỉ:</Text>
                    <Text style={styles.infoValue}>{getFullAddress(user.address)}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày tham gia:</Text>
                    <Text style={styles.infoValue}>{formatDate(user.joinedDate)}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#4CAF50',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    verifiedText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    statusContainer: {
        marginTop: 5,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    activeStatus: {
        backgroundColor: '#E8F5E8',
    },
    inactiveStatus: {
        backgroundColor: '#FFE8E8',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4CAF50',
    },
    statsContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 20,
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6B6B',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 15,
        marginHorizontal: 15,
        borderRadius: 10,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        flex: 1,
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
        flex: 2,
        textAlign: 'right',
    },
});