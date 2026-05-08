//Optimized
import { Image } from "expo-image";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
// import PowerButton from './PowerButton';
import DriveMode from './drive-mode';
import PowerButton from "./power-mode";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const ANIMATION_DELAY = 2000;
const FADE_DURATION = 500;

const MainContent: React.FC = () => {
    const scale = useSharedValue(0.8);
    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);

    const startAnimations = useCallback(() => {
        opacity.value = withDelay(
            ANIMATION_DELAY,
            withTiming(1, {
                duration: FADE_DURATION,
                easing: Easing.inOut(Easing.ease),
            })
        );

        const springConfig = {
            damping: 8,
            stiffness: 100,
            mass: 1,
            overshootClamping: false,
        };

        scale.value = withDelay(ANIMATION_DELAY, withSpring(1, springConfig));
        translateY.value = withDelay(ANIMATION_DELAY, withSpring(0, springConfig));
    }, [opacity, scale, translateY]);

    useEffect(() => {
        startAnimations();
    }, [startAnimations]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { scale: scale.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        <View style={styles.container}>
            <AnimatedImage
                style={[styles.speedometerGauge, animatedStyle]}
                source={require("@/assets/images/speedometer-gauge2x-1.png")}
                contentFit="cover"
            />
            <DriveMode />
            <View style={styles.powerButton}>
                <PowerButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    speedometerGauge: {
        height: 300,
        width: 300,
        marginBottom: 60
    },
    powerButton: {
        height: 80,
        width: 80,
        marginTop: 50

    },
});

export default MainContent;