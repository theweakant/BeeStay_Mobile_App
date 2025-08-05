import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BannerCarousel = ({ 
  banners = [], 
  autoPlay = true, 
  autoPlayInterval = 3000,
  onBannerPress,
  height = 180,
  borderRadius = 8, 
  showDots = true,
  dotColor = '#FF6B00',
  inactiveDotColor = '#D1D5DB'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const intervalRef = useRef(null);

  
  const defaultBanners = [
    { id: 1, image: require('../../assets/Banner/banner1.jpg'), title: 'Banner 1' },
    { id: 2, image: require('../../assets/Banner/banner2.jpg'), title: 'Banner 2' },
    { id: 3, image: require('../../assets/Banner/banner3.jpg'), title: 'Banner 3' },

  ];

  const displayBanners = banners.length > 0 ? banners : defaultBanners;

  // Auto play functionality
  useEffect(() => {
    if (autoPlay && displayBanners.length > 1) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % displayBanners.length;
        setCurrentIndex(nextIndex);
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, autoPlay, autoPlayInterval, displayBanners.length]);

  // Handle scroll end
  const handleScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  // Handle banner press
  const handleBannerPress = (banner, index) => {
    if (onBannerPress) {
      onBannerPress(banner, index);
    }
  };

  // Handle dot press
  const handleDotPress = (index) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  // Reset interval when user interacts
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (autoPlay && displayBanners.length > 1) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % displayBanners.length;
        setCurrentIndex(nextIndex);
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
      }, autoPlayInterval);
    }
  };

  if (displayBanners.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={resetInterval}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {displayBanners.map((banner, index) => (
          <TouchableOpacity
            key={banner.id || index}
            style={[styles.bannerContainer, { width: screenWidth }]}
            onPress={() => handleBannerPress(banner, index)}
            activeOpacity={0.9}
          >
            <View style={[styles.imageContainer, { height, borderRadius }]}>
              <Image
                source={typeof banner.image === 'string' ? { uri: banner.image } : banner.image}
                style={[styles.bannerImage, { borderRadius }]}
                resizeMode="contain" // Changed from "cover" to "contain" for full image
              />
              {/* Removed overlay for better image visibility */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dots indicator */}
      {showDots && displayBanners.length > 1 && (
        <View style={styles.dotsContainer}>
          {displayBanners.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? dotColor : inactiveDotColor,
                  width: index === currentIndex ? 20 : 8,
                }
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  bannerContainer: {
    paddingHorizontal: 8,
  },
  imageContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: 'white', 
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default BannerCarousel;