import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Reanimated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import NextButton from '../components/onboarding/NextButton';
import OnboardingSlide from '../components/onboarding/OnboardingSlide';
import Paginator from '../components/onboarding/Paginator';

const slides = [
  {
    id: '1',
    title: 'Pair Your Car in Seconds',
    subtitle: "Connect via Bluetooth or NFC — just tap your phone to the dashboard and you're in.",
    icon: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Satellite%20Antenna.png',
  },
  {
    id: '2',
    title: 'Your Car, At Your Fingertips',
    subtitle: 'Lock, unlock, and start your engine from anywhere in the world.',
    icon: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Key.png',
  },
  {
    id: '3',
    title: 'Real-Time Vehicle Diagnostics',
    subtitle: 'Monitor fuel, battery, tire pressure, and engine health live.',
    icon: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png',
  },
  {
    id: '4',
    title: 'Smart Alerts & Trip History',
    subtitle: "Get notified about your car's activity and review every journey.",
    icon: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bell.png',
  },
  {
    id: '5',
    title: 'Geo-Fencing & Climate Control',
    subtitle: 'Set safe zones for your vehicle and pre-cool or heat your car before you even step outside.',
    icon: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Thermometer.png',
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const scrollX = useSharedValue(0);
  const slidesRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const videoSource = require('@/assets/videos/bg.mp4');
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await SecureStore.setItemAsync('onboarding_complete', 'true');
      router.replace('/');
    }
  };

  const skipToLast = () => {
    slidesRef.current?.scrollToIndex({ index: slides.length - 1 });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent />
      <VideoView
        player={player}
        style={StyleSheet.absoluteFillObject}
        nativeControls={false}
        contentFit="cover"
      />

      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.darkOverlay} />
        <LinearGradient
          colors={['transparent', 'rgba(10, 15, 30, 0.8)', '#05070f']}
          style={styles.bottomGradient}
        />
      </View>

      <TouchableOpacity style={styles.skipContainer} onPress={skipToLast}>
        {currentIndex < slides.length - 1 && (
          <BlurView intensity={20} tint="light" style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </BlurView>
        )}
      </TouchableOpacity>

      <Reanimated.FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
        ref={slidesRef as any}
      />

      <View style={styles.footer}>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          isLastSlide={currentIndex === slides.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  skipContainer: {
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#DA1A41',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  skipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
});
