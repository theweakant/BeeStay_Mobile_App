import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Image, 
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// UI Theme - Typography
const typography = {
    heading1: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FF6B00',
    },
    heading2: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FF6B00',
    },
    body: {
        fontSize: 14,
        fontWeight: '400',
        color: '#8c8c8cff',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
    },
};

// UI Theme - Border Radius
const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 22,
    full: 9999,
};

export default function DealScreen() {
    // Banner deals theo từng mục
    const [discountDeals] = useState([
        {
            id: 'd1',
            title: 'Flash Sale 24h',
            subtitle: 'Giảm đến 50% homestay cao cấp',
            image: require('../../../assets/Banner/Deal/7.png'),
        },
        {
            id: 'd2',
            title: 'Siêu Khuyến Mãi',
            subtitle: 'Villa biển chỉ từ 999k/đêm',
            image: require('../../../assets/Banner/Deal/3.png'),
        },
        {
            id: 'd3',
            title: 'Deal Sốc Cuối Tuần',
            subtitle: 'Homestay view núi giảm 40%',
            image: require('../../../assets/Banner/Deal/4.png'),
        }
    ]);

    const [travelSeasonDeals] = useState([
        {
            id: 't1',
            title: 'Xuân Về Miền Trung',
            subtitle: 'Hội An - Huế đón xuân mới',
            image: require('../../../assets/Banner/Deal/6.jpg'),
        },
        {
            id: 't2',
            title: 'Thu Vàng Lãng Mạn',
            subtitle: 'Sapa - Đà Lạt mùa đẹp nhất',
            image: require('../../../assets/Banner/Deal/1.png'),
        },
        {
            id: 't3',
            title: 'Mùa Hè Rực Rỡ',
            subtitle: 'Khám phá biển đảo Việt Nam',
            image: require('../../../assets/Banner/Deal/2.jpg'),
        },
    ]);

    const [familyFriendsDeals] = useState([
        {
            id: 'f1',
            title: 'Gia Đình Vui Vẻ',
            subtitle: 'Villa rộng rãi cho cả nhà',
            image: require('../../../assets/Banner/Deal/5.png'),
        },
        {
            id: 'f2',
            title: 'Nhóm Bạn Thân',
            subtitle: 'Homestay party - BBQ thoải mái',
            image: require('../../../assets/Banner/Deal/8.jpg'),
        },
        {
            id: 'f3',
            title: 'Team Building',
            subtitle: 'Không gian lý tưởng cho công ty',
            image: require('../../../assets/Banner/Deal/3.png'),
        }
    ]);

    const renderBannerItem = ({ item }) => (
        <TouchableOpacity style={styles.bannerCard} activeOpacity={0.8}>
            <Image source={item.image} style={styles.bannerImage} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Khuyến mãi</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>Ưu đãi BeeStay siêu hấp dẫn!</Text>
                </View>

                {/* Giảm giá hấp dẫn */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleContainer}>
                            <Ionicons name="pricetag" size={20} color="#FF6B00" />
                            <Text style={styles.sectionTitle}>Giảm Giá Hấp Dẫn</Text>
                        </View>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                            <Ionicons name="chevron-forward" size={12} color="#8c8c8cff" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={discountDeals}
                        renderItem={renderBannerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.bannerList}
                    />
                </View>

                {/* Mùa du lịch đã đến */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleContainer}>
                            <Ionicons name="sunny" size={20} color="#FF9500" />
                            <Text style={styles.sectionTitle}>Mùa Du Lịch Đã Đến</Text>
                        </View>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                            <Ionicons name="chevron-forward" size={12} color="#8c8c8cff" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={travelSeasonDeals}
                        renderItem={renderBannerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.bannerList}
                    />
                </View>

                {/* Du lịch cùng gia đình, bạn bè */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleContainer}>
                            <Ionicons name="people" size={20} color="#FF6B00" />
                            <Text style={styles.sectionTitle}>Du Lịch Cùng Gia Đình, Bạn Bè</Text>
                        </View>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={styles.seeAllText}>Xem tất cả</Text>
                            <Ionicons name="chevron-forward" size={12} color="#8c8c8cff" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={familyFriendsDeals}
                        renderItem={renderBannerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.bannerList}
                    />
                </View>

                {/* Padding bottom for better scrolling */}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: 'transparent',
        borderBottomWidth: 0.5,
        borderBottomColor: '#dededeff',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    headerTitle: {
        ...typography.heading1,
    },
    headerSubtitle: {
        ...typography.body,
    },
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sectionTitle: {
        ...typography.heading2,
        marginLeft: 8,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 12,
        color: '#8c8c8cff',
        fontWeight: '400',
        marginRight: 2,
    },
    
    // Banner Styles
    bannerList: {
        paddingHorizontal: 16,
    },
    bannerCard: {
        width: width * 0.9,
        height: 160,
        marginHorizontal: 4,
        borderRadius: radius.lg,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(204, 199, 181, 0.6)',
        paddingVertical: 8,
        paddingHorizontal: 8
    },
    bannerTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#908c86ff',
        marginBottom: 4,
    },
    bannerSubtitle: {
        ...typography.body,
        color: '#908c86ff',
    },
    bottomPadding: {
        height: 20,
    },
});