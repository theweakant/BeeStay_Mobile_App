"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import SearchFilter from "../../../components/SearchFilter"
import ItemList from "../../../components/List/ItemList"
import AddStaycationForm from "../../../components/Form/AddStaycationForm"
import HomestayDetailModal from "../../../components/Modal/HomestayDetail/HomestayDetailModal"
import { useAuth } from "../../../redux/hooks/useAuth"
import { fetchHomestaysByHost, clearHostHomestays } from "../../../redux/slices/homestay.slice"
import { formatCurrency } from "../../../utils/textUtils"

const { width } = Dimensions.get("window")

export default function MyHomestayScreen() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const accountId = user?.accountId

  // Redux state
  const { hostHomestays, fetchingByHost, fetchByHostError, hostHomestaysCount } = useSelector((state) => state.homestay)

  // Local state management
  const [filteredHomestays, setFilteredHomestays] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRating, setFilterRating] = useState("all")
  const [searchText, setSearchText] = useState("")
  const [selectedHomestay, setSelectedHomestay] = useState(null)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Helper function to validate homestay data
  const validateHomestayData = (homestays) => {
    if (!Array.isArray(homestays)) return []

    return homestays.map((homestay) => ({
      ...homestay,
      name: homestay.name || "Chưa có tên",
      location: homestay.location,
      status: homestay.status || "inactive",
      rating: typeof homestay.rating === "number" ? homestay.rating : 0,
      id: homestay.id || homestay._id || Math.random().toString(36).substr(2, 9),
    }))
  }

  // Fetch homestays when component mounts or accountId changes
  useEffect(() => {
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId))
    }

    // Cleanup when component unmounts
    return () => {
      dispatch(clearHostHomestays())
    }
  }, [dispatch, accountId])

  // Filter logic
  const applyFilters = () => {
    const validatedHomestays = validateHomestayData(hostHomestays || [])
    let filtered = validatedHomestays

    if (filterStatus !== "all") {
      filtered = filtered.filter((h) => h.status === filterStatus)
    }

    if (filterRating !== "all") {
      const minRating = Number.parseFloat(filterRating)
      filtered = filtered.filter((h) => h.rating >= minRating)
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase()
      filtered = filtered.filter(
        (h) =>
          (h.name && h.name.toLowerCase().includes(searchLower)) ||
          (h.location && h.location.toLowerCase().includes(searchLower)),
      )
    }

    setFilteredHomestays(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filterStatus, filterRating, searchText, hostHomestays])

  // Check if filters are active
  const hasActiveFilters = filterStatus !== "all" || filterRating !== "all"

  // Toggle homestay status
  const toggleHomestayStatus = (id) => {
    const homestayToUpdate = hostHomestays.find((h) => h.id === id)
    if (homestayToUpdate) {
      dispatch(fetchHomestaysByHost(accountId))
    }
  }

  // View details
  const viewDetails = (homestay) => {
    setSelectedHomestay(homestay)
    setDetailModalVisible(true)
  }

  // Handle filter modal
  const handleFilterPress = () => {
    setFilterModalVisible(true)
  }

  const handleFilterClose = () => {
    setFilterModalVisible(false)
  }

  const handleDetailModalClose = () => {
    setDetailModalVisible(false)
    setSelectedHomestay(null)
  }

  // Handle add modal
  const handleAddPress = () => {
    if (!accountId) {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để thêm homestay")
      return
    }
    setAddModalVisible(true)
  }

  const handleAddModalClose = () => {
    setAddModalVisible(false)
  }

  // Handle add success - refresh data
  const handleAddSuccess = () => {
    setAddModalVisible(false)
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId))
    }
  }

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId))
    }
    setTimeout(() => setRefreshing(false), 1000)
  }

  // Handle error retry
  const handleRetry = () => {
    if (accountId) {
      dispatch(fetchHomestaysByHost(accountId))
    }
  }

  // Safe count calculations
  const validatedHomestays = validateHomestayData(hostHomestays || [])
  const activeCount = validatedHomestays.filter((h) => h.status === "active").length
  const inactiveCount = validatedHomestays.filter((h) => h.status === "inactive").length
  const totalRevenue = validatedHomestays.reduce((sum, h) => sum + (h.revenue || 0), 0)

  // Show loading state
  if (fetchingByHost && !hostHomestays?.length) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải homestays...</Text>
        </View>
      </View>
    )
  }

  // Show error state
  if (fetchByHostError && !hostHomestays?.length) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>⚠️</Text>
          </View>
          <Text style={styles.errorTitle}>Có lỗi xảy ra</Text>
          <Text style={styles.errorDescription}>Không thể tải danh sách homestays. Vui lòng thử lại.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Show empty state
  if (!hostHomestays?.length && !fetchingByHost) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <View style={styles.headerInfo}>
                <View style={styles.headerIcon}>
                  <Text style={styles.headerIconText}>🏠</Text>
                </View>
                <View>
                  <Text style={styles.title}>Quản Lý Homestay</Text>
                  <Text style={styles.subtitle}>0 homestay</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
                <Text style={styles.addButtonText}>+ Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyStateCard}>
            <View style={styles.emptyStateIcon}>
              <Text style={styles.emptyStateIconText}>🏡</Text>
            </View>
            <Text style={styles.emptyStateTitle}>Chưa có homestay nào</Text>
            <Text style={styles.emptyStateDescription}>
              Bạn chưa có homestay nào. Hãy thêm homestay đầu tiên của bạn để bắt đầu kinh doanh!
            </Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={handleAddPress}>
              <Text style={styles.emptyStateButtonText}>+ Thêm Homestay Đầu Tiên</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Modal */}
        <Modal
          visible={addModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleAddModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle}>Thêm Homestay Mới</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleAddModalClose}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <AddStaycationForm accountId={accountId} onSuccess={handleAddSuccess} />
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#007AFF"]} tintColor="#007AFF" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <View style={styles.headerInfo}>
                <View style={styles.headerIcon}>
                  <Text style={styles.headerIconText}>🏠</Text>
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.title}>Quản Lý Homestay</Text>
                  <Text style={styles.subtitle}>
                    {filteredHomestays.length} / {hostHomestaysCount || validatedHomestays.length} homestay
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
                <Text style={styles.addButtonText}>+ Thêm</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statLabel}>Hoạt động</Text>
                  <View style={[styles.statDot, styles.activeDot]} />
                </View>
                <Text style={styles.statValue}>{activeCount}</Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statLabel}>Tạm dừng</Text>
                  <View style={[styles.statDot, styles.inactiveDot]} />
                </View>
                <Text style={styles.statValue}>{inactiveCount}</Text>
              </View>

              <View style={[styles.statCard, styles.revenueCard]}>
                <View style={styles.statHeader}>
                  <Text style={styles.revenueLabel}>Doanh thu</Text>
                  <Text style={styles.revenueIcon}>💰</Text>
                </View>
                <Text style={styles.revenueValue}>{formatCurrency(totalRevenue)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <SearchFilter
            searchValue={searchText}
            onSearchChange={setSearchText}
            searchPlaceholder="Tìm kiếm homestay..."
            filterVisible={filterModalVisible}
            onFilterClose={handleFilterClose}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterRating={filterRating}
            setFilterRating={setFilterRating}
            onFilterPress={handleFilterPress}
            hasActiveFilters={hasActiveFilters}
            showLogo={false}
          />
        </View>

        {/* Homestay List */}
        <View style={styles.listContainer}>
          <ItemList
            homestays={filteredHomestays}
            toggleHomestayStatus={toggleHomestayStatus}
            viewDetails={viewDetails}
            formatCurrency={formatCurrency}
            loading={fetchingByHost}
            onRefresh={handleRefresh}
          />
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <HomestayDetailModal
        visible={detailModalVisible}
        onClose={handleDetailModalClose}
        homestayId={selectedHomestay?.id}
        formatCurrency={formatCurrency}
      />

      {/* Add Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleAddModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderContent}>
              <Text style={styles.modalTitle}>Thêm Homestay Mới</Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleAddModalClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          <AddStaycationForm accountId={accountId} onSuccess={handleAddSuccess} />
        </View>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleRefresh} disabled={fetchingByHost}>
        <Text style={[styles.fabText, fetchingByHost && styles.fabTextRotating]}>↻</Text>
      </TouchableOpacity>

      {/* Error Badge */}
      {fetchByHostError && (
        <View style={styles.errorBadge}>
          <Text style={styles.errorBadgeText}>!</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },

  // Header Styles
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerGradient: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerIconText: {
    fontSize: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Stats Styles
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  revenueCard: {
    backgroundColor: "#FEF3C7",
    borderColor: "#F59E0B",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  revenueLabel: {
    fontSize: 12,
    color: "#92400E",
    fontWeight: "500",
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#10B981",
  },
  inactiveDot: {
    backgroundColor: "#EF4444",
  },
  revenueIcon: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
  },

  // Search Container
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  // List Container
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },
  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minWidth: width * 0.7,
  },
  loadingText: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 16,
    fontWeight: "500",
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },
  errorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minWidth: width * 0.8,
  },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  errorIconText: {
    fontSize: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 8,
    textAlign: "center",
  },
  errorDescription: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#DC2626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  emptyStateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minWidth: width * 0.8,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyStateIconText: {
    fontSize: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateDescription: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyStateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  modalHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "600",
  },

  // Floating Action Button
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  fabTextRotating: {
    transform: [{ rotate: "180deg" }],
  },

  // Error Badge
  errorBadge: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  errorBadgeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
})
