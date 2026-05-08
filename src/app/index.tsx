import LeftMenu from "@/components/peformance-screen/left-menu";
import MainContent from "@/components/peformance-screen/main-context";
import RightMenu from "@/components/peformance-screen/right-menu";
import { Redirect, useFocusEffect, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Color } from "../constants/theme";

export default function DrivingPerfomanceScreen() {
  const [fadeOutElements, setFadeOutElements] = useState(false);
  const opacity = useSharedValue(1);
  const params = useLocalSearchParams()
  const resetOpacityParam = params.resetOpacity ? JSON.parse(params.resetOpacity as string) : false

  const [isChecking, setIsChecking] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const val = await SecureStore.getItemAsync('onboarding_complete');
        if (val !== 'true') {
          setNeedsOnboarding(true);
        }
      } catch (error) {
        console.error('Error checking SecureStore:', error);
      } finally {
        setIsChecking(false);
      }
    }
    checkAuth();
  }, []);

  const resetOpacity = useCallback(() => {
    opacity.value = withTiming(1, { duration: 300 });
    setFadeOutElements(false);
  }, [opacity]);


  useFocusEffect(
    useCallback(() => {
      if (resetOpacityParam) {
        resetOpacity();
      }
    }, [resetOpacity, resetOpacity])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetOpacity()
      }
    }, [resetOpacity])
  )

  const fadeOut = useCallback(() => {
    opacity.value = withTiming(0, { duration: 600 })
  }, [opacity])

  // This effect will run when fadeOutElements changes
  useEffect(() => {
    if (fadeOutElements) {
      fadeOut();
    }
  }, [fadeOutElements, fadeOut]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (isChecking) return null;
  if (needsOnboarding) return <Redirect href="/onboarding" />;

  return (
    <GestureHandlerRootView>
      <View style={styles.drivingPerformanceScreen}>
        <Animated.View>
          <MainContent />
        </Animated.View>
        <Animated.View style={animatedStyle}>
          <LeftMenu setFadeOutElements={setFadeOutElements} />
        </Animated.View>
        <Animated.View style={animatedStyle}>
          <RightMenu />
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drivingPerformanceScreen: {
    flex: 1,
    width: "100%",
    // height: 852,
    overflow: "hidden",
    backgroundColor: Color.colorBlack,
    borderRadius: 40,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 60,
    },
    shadowRadius: 100,
    elevation: 100,
    shadowOpacity: 1,
  },
});