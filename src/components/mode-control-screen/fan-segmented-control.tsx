import {
    Border,
    Color,
    FontFamily,
    FontSize,
    Padding,
} from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    interpolateColor,
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const MENU_ITEMS = ['OFF', 'NO A/C', 'ON'];
const MENU_WIDTH = 315;
const ITEM_WIDTH = MENU_WIDTH / 3;

const FanSegmentedControl: React.FC = () => {
    const offset = useSharedValue<number>(ITEM_WIDTH * 2); // Start with 'ON' selected

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const handlePress = (index: number) => {
        offset.value = withTiming(index * ITEM_WIDTH);
    };

    return (
        <View style={styles.segmentedControl}>
            <Animated.View style={[styles.animatedBackground, animatedStyles]}>
                <LinearGradient
                    style={[StyleSheet.absoluteFill, styles.gradientBorderRadius]}
                    locations={[0, 1]}
                    colors={["#3a246a", "#da1a41"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
            {MENU_ITEMS.map((item, index) => (
                <Pressable
                    key={item}
                    style={styles.buttonToggle}
                    onPress={() => handlePress(index)}
                >
                    <AnimatedText offset={offset} index={index} text={item} />
                </Pressable>
            ))}
        </View>
    );
};

interface AnimatedTextProps {
    offset: SharedValue<number>;
    index: number;
    text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ offset, index, text }) => {
    const isActive = useDerivedValue(() => {
        return offset.value === index * ITEM_WIDTH ? 1 : 0;
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
        <Animated.Text style={[styles.menuText, textColorStyle]}>
            {text}
        </Animated.Text>
    );
};

const styles = StyleSheet.create({
    segmentedControl: {
        flexDirection: 'row',
        borderRadius: Border.br_3xs,
        backgroundColor: Color.darkModeContainerBackground,
        height: 44,
        width: MENU_WIDTH,
        padding: Padding.p_11xs,
        alignItems: 'center',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: Color.colorGray_300,
        borderStyle: 'solid',
        overflow: 'hidden',
        marginTop: 20,
    },
    buttonToggle: {
        width: ITEM_WIDTH,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    animatedBackground: {
        position: 'absolute',
        width: ITEM_WIDTH,
        height: '100%',
    },
    gradientBorderRadius: {
        borderRadius: 9,
    },
    menuText: {
        fontFamily: FontFamily.bodyRegular,
        fontSize: FontSize.subheadlineEmphasized_size,
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: 'center',
    },
});

export default FanSegmentedControl;