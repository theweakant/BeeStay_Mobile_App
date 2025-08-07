import React, { useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
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
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#FFA500" />
                <Text style={styles.loadingText}>Đang tải thông tin...</Text>
            </SafeAreaView>
        );
    }

    if (userError) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Có lỗi xảy ra: {userError}</Text>
            </SafeAreaView>
        );
    }

    if (!userProfile) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Không có dữ liệu người dùng</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: userProfile.avatar || userProfile.image || 'https://via.placeholder.com/100' }}
                            style={styles.avatar}
                            defaultSource={require('../../../../assets/Avatar/default-avatar.jpg')}
                        />
                    <View
                        style={[
                            styles.statusDot,
                            userProfile.status === 'active'
                                ? styles.statusDotActive
                                : styles.statusDotInactive,
                        ]}
                    />
                    </View>
                    <Text style={styles.userName}>{userProfile.name}</Text>
                    <View style={styles.updateAvatar}>
                        <UpdateAvatar
                            accountId={authUser?.accountId}
                            currentAvatar={userProfile.avatar || userProfile.image}
                            onAvatarUpdated={handleAvatarUpdated}
                        />
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{userProfile.currentBooking || 0}</Text>
                        <Text style={styles.statLabel}>Đang đặt</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{userProfile.totalBookingSuccess || 0}</Text>
                        <Text style={styles.statLabel}>Hoàn thành</Text>
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
                            <AntDesign name="edit" size={16} color="#FFA500" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{userProfile.email || 'Chưa cập nhật'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Số điện thoại</Text>
                            <Text style={styles.infoValue}>{userProfile.phone || 'Chưa cập nhật'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Giới tính</Text>
                            <Text style={styles.infoValue}>
                                {userProfile.gender === 'female' ? 'Nữ' : userProfile.gender === 'male' ? 'Nam' : 'Chưa cập nhật'}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Ngày sinh</Text>
                            <Text style={styles.infoValue}>
                                {userProfile.birthDate ? formatDate(userProfile.birthDate) : 'Chưa cập nhật'}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Địa chỉ</Text>
                            <Text style={styles.infoValue}>
                                {userProfile.addressResponse ? getFullAddress(userProfile.addressResponse) : 'Chưa cập nhật'}
                            </Text>
                        </View>
                        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                            <Text style={styles.infoLabel}>Ngày tham gia</Text>
                            <Text style={styles.infoValue}>
                                {userProfile.joinedDate ? formatDate(userProfile.joinedDate) : 'Chưa cập nhật'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666666',
        fontWeight: '500',
    },
    errorText: {
        fontSize: 16,
        color: '#FF6B6B',
        textAlign: 'center',
        marginHorizontal: 20,
        fontWeight: '500',
    },
    header: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
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
        borderColor: '#FFFFFF',
    },
    verifiedText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#132e9bff',
        textAlign: 'center',
    },
    statusContainer: {
        marginVertical: 8,
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 25,
    },
    activeStatus: {
        backgroundColor: '#E8F5E8',
    },
    inactiveStatus: {
        backgroundColor: '#FFE8E8',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeStatusText: {
        color: '#4CAF50',
    },
    inactiveStatusText: {
        color: '#FF6B6B',
    },
    statsContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingVertical: 16,
        marginTop: 8,
        marginHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFA500',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#F5F5F5',
        marginVertical: 12,
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        marginHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
    },
    editButton: {
        paddingHorizontal: 4,
        paddingVertical: 6,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FA',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666666',
        flex: 1,
        textAlign: 'left',
    },
    infoValue: {
        fontSize: 14,
        color: '#333333',
        flex: 2,
        textAlign: 'right',
    },
    statusDot: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
},
statusDotActive: {
    backgroundColor: '#4CAF50',
},
statusDotInactive: {
    backgroundColor: '#FF6B6B',
},
updateAvatar: {
    position: 'absolute',
    top: 2,
    right: 7,
    zIndex: 10, 
},
});