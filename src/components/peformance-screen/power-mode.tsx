import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const PowerButton = () => {
    const pulseScale = useSharedValue(1);

    React.useEffect(() => {
        pulseScale.value = withRepeat(
            withTiming(1.1, {
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, []);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, animatedStyles]}>
                <Image
                    style={styles.ellipse}
                    contentFit="cover"
                    source={require("@/assets/images/ellipse-34.png")}
                />
                <LinearGradient
                    style={styles.gradient}
                    locations={[0, 1]}
                    colors={["#3a246a", "#da1a41"]}
                >
                    <Image
                        style={styles.powerIcon}
                        contentFit="cover"
                        source={require("@/assets/images/power.png")}
                    />
                </LinearGradient>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ellipse: {
        position: 'absolute',
        width: 80,
        height: 80,
    },
    gradient: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    powerIcon: {
        width: 21,
        height: 22,
    },
});

export default PowerButton;