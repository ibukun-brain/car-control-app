import { Padding } from "@/constants/theme";
import { Image } from 'expo-image';
import { router } from "expo-router";
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated';

const ANIMATION_DELAY = 2500;
const MENU_DELAY_OFFSET = 100;

type LeftMenuProps = {
    setFadeOutElements: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeftMenu: React.FC<LeftMenuProps> = ({ setFadeOutElements }) => {
    const translateX = useSharedValue(-64);
    const menuTranslateX = useSharedValue(-100);

    useEffect(() => {
        translateX.value = withDelay(
            ANIMATION_DELAY,
            withSpring(0, {
                damping: 10,
                stiffness: 80,
                mass: 1,
                overshootClamping: false,
            })
        );

        menuTranslateX.value = withDelay(
            ANIMATION_DELAY + MENU_DELAY_OFFSET,
            withSpring(0, {
                damping: 10,
                stiffness: 100,
                mass: 1,
                overshootClamping: false,
            })
        );
    }, []);

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedMenuStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: menuTranslateX.value }],
    }));

    const handleClimateControlPress = () => {
        setFadeOutElements(true);
        setTimeout(() => {
            router.push('/mode-control');
        }, 600);
    };

    const menuItems = [
        { key: 'car', source: require("@/assets/images/caricon-1.png"), style: styles.caricon1 },
        { key: 'climate', source: require("@/assets/images/climate.png"), style: styles.climateIcon, onPress: handleClimateControlPress },
        { key: 'parking', source: require("@/assets/images/parking.png"), style: styles.parkingIcon },
        { key: 'driving', source: require("@/assets/images/driving.png"), style: styles.climateIcon },
    ];

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, animatedImageStyle]}>
                <Image
                    style={styles.image}
                    contentFit="cover"
                    source={require("@/assets/images/rectangle-19.png")}
                />
            </Animated.View>
            <Animated.View style={[styles.menu, animatedMenuStyle]}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        style={[styles.menuItem, item.key === 'climate' && styles.climateControl]}
                        onPress={item.onPress}
                    >
                        <Image
                            style={item.style}
                            contentFit="cover"
                            source={item.source}
                        />
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItem: {
        width: 44,
        height: 44,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    climateControl: {
        padding: Padding.p_3xs,
        flexDirection: "row",
    },
    caricon1: {
        width: 24,
        height: 20,
    },
    climateIcon: {
        width: 22,
        height: 22,
    },
    parkingIcon: {
        width: 14,
        height: 20,
    },
});

export default LeftMenu;