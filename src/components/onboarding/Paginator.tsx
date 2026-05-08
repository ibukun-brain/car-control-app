import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
  SharedValue
} from 'react-native-reanimated';

interface PaginatorProps {
  data: any[];
  scrollX: SharedValue<number>;
}

export default function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const animatedStyle = useAnimatedStyle(() => {
          // Reanimated interpolate
          const dotWidth = interpolate(
            scrollX.value,
            inputRange,
            [10, 24, 10],
            Extrapolate.CLAMP
          );

          const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
          );

          return {
            width: dotWidth,
            opacity,
          };
        });

        const activeColorStyle = useAnimatedStyle(() => {
          const color = interpolate(
            scrollX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
          );
          
          return {
            backgroundColor: color === 1 ? '#DA1A41' : 'rgba(255, 255, 255, 0.5)',
          };
        });

        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, animatedStyle, activeColorStyle]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});
