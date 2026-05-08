//Optimized
import { Border, Color, FontFamily, FontSize, Padding } from "@/constants/theme";
import { Image } from "expo-image";
import React, { useCallback, useEffect } from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, Mask, Rect, Image as SvgImage } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ControlButtonProps {
    icon: ImageSourcePropType;
}

const ControlButton: React.FC<ControlButtonProps> = ({ icon }) => (
    <View style={styles.controlButton}>
        <Image
            style={styles.controlIcon}
            contentFit="cover"
            source={icon}
        />
    </View>
);

const DriveMode: React.FC = () => {
    const flickerOpacity = useSharedValue(1);
    const progress = useSharedValue(0);

    const startAnimations = useCallback(() => {
        flickerOpacity.value = withRepeat(
            withSequence(
                withTiming(0.3, { duration: 50 }),
                withTiming(1, { duration: 50 }),
                withTiming(0.5, { duration: 50 }),
                withTiming(1, { duration: 50 })
            ),
            3,
            false
        );

        progress.value = withDelay(
            750,
            withTiming(1, {
                duration: 2000,
                easing: Easing.inOut(Easing.cubic),
            })
        );
    }, [flickerOpacity, progress]);

    useEffect(() => {
        startAnimations();
    }, [startAnimations]);

    const flickerStyle = useAnimatedStyle(() => ({
        opacity: flickerOpacity.value,
    }));

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: 565.48 * (1 - progress.value),
    }));

    return (
        <Animated.View style={[styles.driveMode, flickerStyle]}>
            <View style={styles.outlineParent}>
                <Image
                    style={styles.outlineImage}
                    contentFit="cover"
                    source={require("@/assets/images/outline.png")}
                />
                <Image
                    style={styles.blurIcon}
                    contentFit="cover"
                    source={require("@/assets/images/blur.png")}
                />
                <View style={styles.svgContainer}>
                    <Svg height="200" width="200" viewBox="0 0 200 200">
                        <Defs>
                            <Mask id="mask">
                                <Rect x="0" y="0" width="200" height="200" fill="black" />
                                <AnimatedCircle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    stroke="white"
                                    strokeWidth="180"
                                    strokeDasharray={565.48}
                                    animatedProps={animatedProps}
                                    fill="none"
                                    transform="rotate(90 100 100)"
                                />
                            </Mask>
                        </Defs>
                        <SvgImage
                            x="0"
                            y="0"
                            width="200"
                            height="200"
                            href={require("@/assets/images/progress.png")}
                            mask="url(#mask)"
                        />
                    </Svg>
                </View>
                <Text style={styles.driveLabel}>D</Text>
            </View>
            <Image
                style={styles.driveModeChild}
                contentFit="cover"
                source={require("@/assets/images/polygon-14.png")}
            />
            <View style={styles.segmentedControl}>
                <ControlButton icon={require("@/assets/images/leftchevron.png")} />
                <View style={styles.button2}>
                    <Text style={styles.label} numberOfLines={1}>
                        Sport
                    </Text>
                </View>
                <ControlButton icon={require("@/assets/images/rightchevron.png")} />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    driveMode: {
        height: 220,
        width: 220,
    },
    outlineParent: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginTop: -110,
        marginLeft: -110,
        height: 220,
        width: 220,
    },
    outlineImage: {
        height: '100%',
        width: '100%',
    },
    blurIcon: {
        position: 'absolute',
        height: 200,
        width: 200,
        left: '50%',
        top: '50%',
        marginLeft: -100,
        marginTop: -100,
        display: "none",
    },
    svgContainer: {
        position: 'absolute',
        height: 200,
        width: 200,
        left: '50%',
        top: '50%',
        marginLeft: -100,
        marginTop: -100,
    },
    driveLabel: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginTop: -38,
        marginLeft: -24,
        fontSize: FontSize.size_45xl,
        letterSpacing: -2.6,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.labelsPrimary,
    },
    driveModeChild: {
        position: 'absolute',
        left: '50%',
        marginLeft: -10,
        top: 210,
        borderRadius: Border.br_11xs,
        width: 20,
        height: 20,
    },
    segmentedControl: {
        position: 'absolute',
        left: '50%',
        marginLeft: -54,
        top: 176,
        borderRadius: Border.br_4xs,
        padding: Padding.p_11xs,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    controlButton: {
        paddingVertical: Padding.p_10xs,
        paddingHorizontal: Padding.p_3xs,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        borderRadius: Border.br_6xs,
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 8,
        elevation: 8,
        shadowOpacity: 1,
    },
    controlIcon: {
        width: 7,
        height: 12,
    },
    button2: {
        paddingVertical: Padding.p_10xs,
        paddingHorizontal: Padding.p_3xs,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: FontSize.footnoteRegular_size,
        lineHeight: 18,
        fontWeight: "600",
        fontFamily: FontFamily.bodyEmphasized,
        textAlign: "center",
        width: 36,
        height: 18,
        overflow: "hidden",
        color: Color.labelsPrimary,
    },
});

export default DriveMode;