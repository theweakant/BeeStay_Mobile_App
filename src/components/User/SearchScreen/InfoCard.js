import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { truncateText } from "../../../utils/textUtils"

import defaultImage from "../../../../assets/AvailableImage/default_homestay_image.png"

const InfoCard = ({ item, onPress, style, imageStyle, contentStyle, onFavoritePress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(item)
    }
  }

  const handleFavoritePress = () => {
    if (onFavoritePress) {
      onFavoritePress(item)
    }
  }

  const getLocationText = () => {
    if (item.location && item.location.city) {
      return truncateText(item.location.city)
    }
    return "Chưa cập nhật"
  }

  const getDiscountPercentage = () => {
    if (item.originalPricePerNight && item.pricePerNight) {
      const discount = ((item.originalPricePerNight - item.pricePerNight) / item.originalPricePerNight) * 100
      return Math.round(discount)
    }
    return 0
  }

  const formatPrice = (price) => {
    if (!price) return "0"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const discountPercentage = getDiscountPercentage()
  const hasDiscount = discountPercentage > 0 && item.originalPricePerNight

  return (
    <TouchableOpacity style={[styles.homestayCard, style]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={item.image ? { uri: item.image } : defaultImage} style={[styles.homestayImage, imageStyle]} />

        {/* Discount Badge */}
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <FontAwesome name="tag" size={8} color="#fff" />
            <Text style={styles.discountText}>-{discountPercentage}%</Text>
          </View>
        )}

        {/* Heart/Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <FontAwesome
            name={item.isFavorite ? "heart" : "heart-o"}
            size={14}
            color={item.isFavorite ? "#FF6B6B" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.cardContent, contentStyle]}>
        {/* Homestay Name */}
        <Text style={styles.homestayName} numberOfLines={2}>
          {item.name || "Homestay không tên"}
        </Text>

        {/* Location */}
        <Text style={styles.locationText} numberOfLines={1}>
          📍 {getLocationText()}
        </Text>

        {/* Rating Container */}
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>
            {item.averageRating || "0.0"}
          </Text>
          <Text style={styles.reviewCount}>
            ({item.reviewCount || 0})
          </Text>
        </View>

        {/* Price Container - Vertical Layout */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {formatPrice(item.pricePerNight)}₫
          </Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>
              {formatPrice(item.originalPricePerNight)}₫
            </Text>
          )}
          <Text style={styles.priceUnit}>/đêm</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  homestayCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 110,
    overflow: "hidden",
  },
  homestayImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    shadowColor: "#EF4444",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  homestayName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 16,
    letterSpacing: -0.1,
  },
  locationText: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 6,
    fontWeight: "400",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "600",
  },
  reviewCount: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#059669",
    letterSpacing: -0.2,
  },
  originalPrice: {
    fontSize: 10,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    fontWeight: "400",
    marginTop: -2,
  },
  priceUnit: {
    fontSize: 9,
    color: "#6B7280",
    fontWeight: "400",
    marginTop: -1,
  },
})

export default InfoCard