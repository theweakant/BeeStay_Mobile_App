import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchUserByAccount } from '../../../redux/slices/user.slice';
import { formatDate, getFullAddress } from '../../../utils/textUtils';
import UpdateAvatar from '../../../components/UpdateAvatar';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { user: authUser, isAuthenticated } = useSelector((state) => state.auth);
    const { profile: userProfile, loading: userLoading, error: userError } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated && authUser?.accountId) {
            dispatch(fetchUserByAccount(authUser.accountId));
        }
    }, [dispatch, isAuthenticated, authUser?.accountId]);

    const handleAvatarUpdated = () => {
        if (authUser?.accountId) {
            dispatch(fetchUserByAccount(authUser.accountId));
        }
    };

    if (userLoading && !userProfile) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#F5B041" />
                <Text style={styles.loadingText}>Đang tải thông tin...</Text>
            </View>
        );
    }

    if (userError) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Có lỗi xảy ra: {userError}</Text>
            </View>
        );
    }

    if (!userProfile) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Không có dữ liệu người dùng</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: userProfile.avatar || userProfile.image || 'https://via.placeholder.com/100' }}
                        style={styles.avatar}
                        defaultSource={require('../../../../assets/Avatar/default-avatar.jpg')}
                    />
                    {userProfile.verified && (
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>✓</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.name}>{userProfile.name}</Text>
                <Text style={styles.email}>{userProfile.email}</Text>

                <View style={styles.statusContainer}>
                    <View
                        style={[
                            styles.statusBadge,
                            userProfile.status === 'active' ? styles.activeStatus : styles.inactiveStatus,
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                userProfile.status === 'active' ? styles.activeStatusText : styles.inactiveStatusText,
                            ]}
                        >
                            {userProfile.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </Text>
                    </View>
                </View>

                <UpdateAvatar
                    accountId={authUser?.accountId}
                    currentAvatar={userProfile.avatar || userProfile.image}
                    onAvatarUpdated={handleAvatarUpdated}
                />
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.currentBooking || 0}</Text>
                    <Text style={styles.statLabel}>Đang đặt</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.totalBookingSuccess || 0}</Text>
                    <Text style={styles.statLabel}>Đã hoàn thành</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.favoriteHomestay?.length || 0}</Text>
                    <Text style={styles.statLabel}>Yêu thích</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.reviewCount || 0}</Text>
                    <Text style={styles.statLabel}>Đánh giá</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        style={styles.editButton}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Số điện thoại:</Text>
                    <Text style={styles.infoValue}>{userProfile.phone || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Giới tính:</Text>
                    <Text style={styles.infoValue}>
                        {userProfile.gender === 'female' ? 'Nữ' : userProfile.gender === 'male' ? 'Nam' : 'N/A'}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày sinh:</Text>
                    <Text style={styles.infoValue}>
                        {userProfile.birthDate ? formatDate(userProfile.birthDate) : 'N/A'}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Địa chỉ:</Text>
                    <Text style={styles.infoValue}>
                        {userProfile.addressResponse ? getFullAddress(userProfile.addressResponse) : 'N/A'}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày tham gia:</Text>
                    <Text style={styles.infoValue}>
                        {userProfile.joinedDate ? formatDate(userProfile.joinedDate) : 'N/A'}
                    </Text>
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
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#FF6B6B',
        textAlign: 'center',
        marginHorizontal: 20,
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
        marginBottom: 15,
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
    },
    activeStatusText: {
        color: '#4CAF50',
    },
    inactiveStatusText: {
        color: '#FF6B6B',
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
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    editText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
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
