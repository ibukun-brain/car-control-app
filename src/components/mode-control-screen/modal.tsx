import { Border, Color, FontFamily, FontSize, Padding } from "@/constants/theme";
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import Defrost from "./defrost";
import ModalHeader from "./modal-header";
import Mode from "./mode";
import TemperatureControl from './temperature-control';

const { height } = Dimensions.get('window');

const Modal: React.FC = () => {
    const [modalHeight, setModalHeight] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);

    const translateY = useSharedValue(height);
    const startY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
        translateY.value = withDelay(
            1400,
            withTiming(0, {
                duration: 800,
                easing: Easing.out(Easing.cubic),
            })
        );
    }, []);

    const temperatureMarginTop = 10;
    const dividerMarginTop = 20;
    const dividerHeight = 1;
    const heighAdjustment = 20;
    const totalExtraMargin = temperatureMarginTop + dividerMarginTop;
    const adjustedHeaderHeight = headerHeight + totalExtraMargin;
    const minimizedTranslateY = modalHeight - adjustedHeaderHeight - dividerHeight - heighAdjustment;

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            startY.value = translateY.value;
        })
        .onUpdate((event) => {
            translateY.value = startY.value + event.translationY;
            translateY.value = Math.min(Math.max(translateY.value, 0), minimizedTranslateY);
        })
        .onEnd(() => {
            if (translateY.value > minimizedTranslateY / 3) {
                translateY.value = withTiming(minimizedTranslateY, { duration: 300 });
            } else {
                translateY.value = withTiming(0, { duration: 300 });
            }
        });

    const tapGesture = Gesture.Tap().onEnd(() => {
        translateY.value = withTiming(0, { duration: 300 });
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.modalContainer, animatedStyles]}>
                <BlurView intensity={100} tint="dark" style={styles.blurView}>
                    <View
                        style={styles.modalContent}
                        onLayout={(event) => setModalHeight(event.nativeEvent.layout.height)}
                    >
                        <GestureDetector gesture={tapGesture}>
                            <Animated.View onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}>
                                <ModalHeader />
                            </Animated.View>
                        </GestureDetector>
                        <View style={styles.divider}>
                            <View style={styles.line} />
                        </View>
                        <Defrost />
                        <Mode />
                        <Text style={styles.viewInteriorCamera}>View Interior Camera</Text>
                        <View style={styles.divider}>
                            <View style={styles.line} />
                        </View>
                        <TemperatureControl />
                    </View>
                </BlurView>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    blurView: {
        overflow: 'hidden',
        borderTopLeftRadius: Border.br_xl,
        borderTopRightRadius: Border.br_xl,
    },
    modalContent: {
        alignItems: "center",
        paddingHorizontal: Padding.p_xl,
        paddingTop: Padding.p_xl,
        paddingBottom: Padding.p_22xl,
    },
    line: {
        height: 1,
        width: "100%",
        backgroundColor: Color.colorGray_300,
    },
    divider: {
        width: 353,
        height: 1,
        marginTop: 20,
    },
    viewInteriorCamera: {
        fontSize: FontSize.captionRegular_size,
        lineHeight: 20,
        fontFamily: FontFamily.bodyRegular,
        color: Color.foregroundTertiary,
        textAlign: "left",
        marginTop: 20,
    },
});

export default Modal;
