import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NextButtonProps {
  scrollTo: () => void;
  isLastSlide: boolean;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function NextButton({ scrollTo, isLastSlide }: NextButtonProps) {
  const widthAnim = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isLastSlide ? 160 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isLastSlide, widthAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} activeOpacity={0.8}>
        <AnimatedBlurView
          intensity={20}
          tint="light"
          style={[styles.button, { width: widthAnim }]}
        >
          {isLastSlide ? (
            <Text style={styles.buttonText}>Start Driving</Text>
          ) : (
            <AntDesign name="arrow-right" size={24} color="#fff" />
          )}
        </AnimatedBlurView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 60,
    backgroundColor: 'rgba(218, 26, 65, 0.85)', // Semi-transparent #DA1A41
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
