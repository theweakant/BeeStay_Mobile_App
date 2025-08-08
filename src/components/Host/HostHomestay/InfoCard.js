import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { truncateText, formatCurrency } from "../../../utils/textUtils"

import defaultImage from "../../../../assets/AvailableImage/default_homestay_image.png"

const InfoCard = ({ item, onPress, style, imageStyle, contentStyle, onFavoritePress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(item)
    }
  }

  const formatPrice = (price) => {
    if (!price) return "0"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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

  const discountPercentage = getDiscountPercentage()

  return (
    <TouchableOpacity style={[styles.homestayCard, style]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item.imageList && item.imageList.length > 0
              ? { uri: item.imageList[0] }
              : defaultImage
          }
          style={[styles.homestayImage, imageStyle]}
        />
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <FontAwesome name="tag" size={8} color="#fff" />
            <Text style={styles.discountText}>-{discountPercentage}%</Text>
          </View>
        )}

        {/* Heart/Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <FontAwesome
            name={item.isFavorite ? "heart" : "heart-o"}
            size={16}
            color={item.isFavorite ? "#FF6B6B" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.cardContent, contentStyle]}>
        <Text style={styles.homestayName} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Location and Rating Container - Horizontal */}
        <View style={styles.locationRatingContainer}>
          <Text style={styles.locationText} numberOfLines={1}>
            📍 {getLocationText()}
          </Text>
          
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color="#FF9500" />
            <Text style={styles.ratingText}>{item.averageRating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
        </View>

        {/* Price Container - Vertical Layout */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(item.pricePerNight)}₫/ đêm</Text>
          {discountPercentage > 0 && item.originalPricePerNight && (
            <Text style={styles.priceOriginalPerNight}>
              {formatPrice(item.originalPricePerNight)}₫/ đêm
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  homestayCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: "transparent", 
    borderRadius: 12,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
    backgroundColor: "transparent", 
  },
  homestayImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "transparent", 
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF4757",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    padding: 12,
    backgroundColor: "#fff", 
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  homestayName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  locationRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "400",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 2,
  },
  price: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },
  priceOriginalPerNight: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
})

export default InfoCard