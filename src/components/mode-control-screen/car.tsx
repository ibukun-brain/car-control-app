import { Image } from "expo-image";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const Car = () => {
    const translateY = useSharedValue<number>(height);
    const scale = useSharedValue<number>(1);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    useEffect(() => {
        translateY.value = withSequence(
            withDelay(
                300,
                withTiming(height / 2 - 352.5, {
                    duration: 300,
                    easing: Easing.out(Easing.cubic),
                })
            ),
            withDelay(
                800,
                withTiming(-124, {
                    duration: 800,
                    easing: Easing.inOut(Easing.cubic),
                })
            )
        );
    }, []);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = event.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1, {
                damping: 6,
                stiffness: 150,
            });
        });

    return (
        <GestureDetector gesture={pinchGesture}>
            <Animated.View style={[styles.container, animatedStyles]}>
                <Image
                    style={styles.image2Icon}
                    contentFit="cover"
                    source={require("@/assets/images/control-screen/image-2.png")}
                />
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: "50%",
        marginLeft: -190,
        width: 380,
        height: 705,
    },
    image2Icon: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
});

export default Car;