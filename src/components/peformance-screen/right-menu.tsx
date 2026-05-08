import { Border, Padding } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const ANIMATION_DURATION = 300;
const SCALE_FACTOR = 1.2;

const menuItems = [
    { key: 'cruise', icon: require("@/assets/images/cruise.png"), style: { width: 21, height: 18 } },
    { key: 'wiper', icon: require("@/assets/images/wiper.png"), style: { width: 30, height: 22 } },
    { key: 'heatedSeats', icon: require("@/assets/images/heatedseat.png"), style: { width: 24, height: 22 } },
    { key: 'doorLock', icon: require("@/assets/images/doorlock.png"), style: { width: 24, height: 26 } },
];

const AnimatedImage = Animated.createAnimatedComponent(Image);

const RightMenu: React.FC = () => {
    const translateX = useSharedValue(64);
    const menuTranslateX = useSharedValue(100);
    const opacities = menuItems.map((_, index) => useSharedValue(index === 0 ? 1 : 0));
    const scales = menuItems.map((_, index) => useSharedValue(index === 0 ? SCALE_FACTOR : 1));

    useEffect(() => {
        const animationConfig = { damping: 10, stiffness: 80, mass: 1, overshootClamping: false };
        translateX.value = withDelay(2500, withSpring(0, animationConfig));
        menuTranslateX.value = withDelay(2600, withSpring(0, { ...animationConfig, stiffness: 100 }));
    }, []);

    const handleItemPress = useCallback((index: number) => {
        opacities.forEach((opacity, i) => {
            opacity.value = withTiming(i === index ? 1 : 0, {
                duration: ANIMATION_DURATION,
                easing: Easing.inOut(Easing.cubic),
            });
        });
        scales.forEach((scale, i) => {
            scale.value = withTiming(i === index ? SCALE_FACTOR : 1, {
                duration: ANIMATION_DURATION,
                easing: Easing.inOut(Easing.cubic),
            });
        });
    }, []);

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedMenuStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: menuTranslateX.value }],
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, animatedImageStyle]}>
                <Image
                    style={styles.image}
                    contentFit="cover"
                    source={require("@/assets/images/rectangle-20.png")}
                />
            </Animated.View>
            <Animated.View style={[styles.menu, animatedMenuStyle]}>
                {menuItems.map((item, index) => (
                    <Pressable
                        key={item.key}
                        style={[styles.menuItem, index > 0 && styles.menuItemMargin]}
                        onPress={() => handleItemPress(index)}
                    >
                        <Animated.View
                            style={[
                                styles.selectionIndicator,
                                useAnimatedStyle(() => ({
                                    opacity: opacities[index].value,
                                    transform: [{ scale: scales[index].value }]
                                }))
                            ]}
                        >
                            <Image
                                style={styles.currentselectionIcon}
                                contentFit="cover"
                                source={require("@/assets/images/currentselection.png")}
                            />
                        </Animated.View>
                        <AnimatedImage
                            style={[
                                item.style,
                                useAnimatedStyle(() => ({
                                    transform: [{ scale: scales[index].value }]
                                }))
                            ]}
                            contentFit="cover"
                            source={item.icon}
                        />
                    </Pressable>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 64,
        height: 428,
    },
    animatedContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    menu: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectionIndicator: {
        ...StyleSheet.absoluteFill,
        width: 44,
        height: 44,
        zIndex: 1,
    },
    currentselectionIcon: {
        width: '100%',
        height: '100%',
    },
    menuItem: {
        borderRadius: Border.br_31xl,
        padding: Padding.p_3xs,
        justifyContent: "center",
        alignItems: "center",
        width: 44,
        height: 44,
    },
    menuItemMargin: {
        marginTop: 40,
    },
});

export default RightMenu;