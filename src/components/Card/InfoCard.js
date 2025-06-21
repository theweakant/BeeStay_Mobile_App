import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { truncateText } from "../../utils/textUtils"

import defaultImage from "../../../assets/AvailableImage/default_homestay_image.png"

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

  const discountPercentage = getDiscountPercentage()

  return (
    <TouchableOpacity style={[styles.homestayCard, style]} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={item.image ? { uri: item.image } : defaultImage} style={[styles.homestayImage, imageStyle]} />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <FontAwesome name="cog" size={10} color="#fff" />
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

        {/* Price Container - Horizontal Layout */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.pricePerNight}VND</Text>
          {item.originalPricePerNight && item.originalPricePerNight !== item.pricePerNight && (
            <Text style={styles.priceOriginalPerNight}>{item.originalPricePerNight}VND</Text>
          )}
        </View>

        {/* Rating Container */}
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={14} color="#FF9500" />
          <Text style={styles.ratingText}>{item.averageRating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  homestayCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  homestayImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  },
  homestayName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  priceOriginalPerNight: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
})

export default InfoCard
