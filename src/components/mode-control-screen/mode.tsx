import {
    Border,
    Color,
    FontFamily,
    FontSize,
    Padding,
    StyleVariable,
} from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    interpolateColor,
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const BUTTON_HEIGHT = StyleVariable.buttonSize;

const Mode: React.FC = () => {
    const [activeMode, setActiveMode] = useState<'pet' | 'normal'>('normal');
    const offset = useSharedValue<number>(BUTTON_HEIGHT); // Start with 'Normal Mode' selected

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    const handlePress = (mode: 'pet' | 'normal') => {
        setActiveMode(mode);
        offset.value = withTiming(mode === 'pet' ? 0 : BUTTON_HEIGHT, { duration: 300 });
    };

    return (
        <View style={styles.mode}>
            <Animated.View style={[styles.animatedBackground, animatedStyles]}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill, styles.gradientBorderRadius]}
                    locations={[0, 1]}
                    colors={["#2737cf", "#da1a41"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
            <Pressable style={styles.modeButton} onPress={() => handlePress('pet')}>
                <View style={styles.buttonCircle}>
                    <Image
                        style={styles.modeIcon}
                        contentFit="cover"
                        source={require("@/assets/images/control-screen/pet.png")}
                    />
                </View>
                <AnimatedText offset={offset} mode='pet' text="Pet Mode" />
            </Pressable>
            <Pressable style={styles.modeButton} onPress={() => handlePress('normal')}>
                <View style={styles.buttonCircle}>
                    <Image
                        style={styles.modeIcon}
                        contentFit="cover"
                        source={require("@/assets/images/control-screen/fan.png")}
                    />
                </View>
                <AnimatedText offset={offset} mode='normal' text="Normal Mode" />
            </Pressable>
        </View>
    );
};

interface AnimatedTextProps {
    offset: SharedValue<number>;
    mode: 'pet' | 'normal';
    text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ offset, mode, text }) => {
    const isActive = useDerivedValue(() => {
        return (mode === 'pet' && offset.value === 0) || (mode === 'normal' && offset.value === BUTTON_HEIGHT) ? 1 : 0;
    });

    const textColorStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            isActive.value,
            [0, 1],
            [Color.foregroundSecondary, Color.labelsPrimary]
        );
        return {
            color,
            fontWeight: isActive.value === 1 ? '600' : 'normal',
        };
    });

    return (
        <Animated.Text style={[styles.modeText, textColorStyle]}>
            {text}
        </Animated.Text>
    );
};

const styles = StyleSheet.create({
    mode: {
        borderRadius: Border.br_3xs,
        backgroundColor: Color.colorBlack,
        width: 353,
        height: BUTTON_HEIGHT * 2,
        marginTop: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Color.colorGray_300,
        borderStyle: "solid",
    },
    modeButton: {
        flexDirection: "row",
        alignItems: "center",
        height: BUTTON_HEIGHT,
        paddingHorizontal: Padding.p_9xs,
    },
    buttonCircle: {
        width: StyleVariable.buttonSize,
        height: StyleVariable.buttonSize,
        justifyContent: "center",
        alignItems: "center",
    },
    modeIcon: {
        width: 19,
        height: 19,
    },
    modeText: {
        flex: 1,
        marginLeft: 8,
        fontSize: FontSize.subheadlineEmphasized_size,
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: "left",
        fontFamily: FontFamily.bodyRegular,
    },
    animatedBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: BUTTON_HEIGHT,
        zIndex: 0,
    },
    gradientBorderRadius: {
        borderRadius: Border.br_7xs,
    },
});

export default Mode;