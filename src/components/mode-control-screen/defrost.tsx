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
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const Defrost: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const opacity = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const handlePress = () => {
        setIsActive(!isActive);
        opacity.value = withTiming(!isActive ? 1 : 0, { duration: 200 });
    };

    const textStyle: TextStyle = {
        color: isActive ? Color.labelsPrimary : Color.foregroundSecondary,
        fontWeight: isActive ? '600' : 'normal',
    };

    return (
        <Pressable style={styles.defrost} onPress={handlePress}>
            <Animated.View style={[StyleSheet.absoluteFill, animatedStyles]}>
                <LinearGradient
                    style={StyleSheet.absoluteFill}
                    locations={[0, 1]}
                    colors={["#2737cf", "#da1a41"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </Animated.View>
            <View style={[styles.content, styles.defrostFlexBox]}>
                <View style={[styles.buttonCircle, styles.defrostFlexBox]}>
                    <Image
                        style={styles.defrostIcon}
                        contentFit="cover"
                        source={require("@/assets/images/control-screen/defrost.png")}
                    />
                </View>
                <Text style={[styles.quickDefrost, textStyle]}>Quick Defrost</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    defrost: {
        borderRadius: Border.br_3xs,
        backgroundColor: Color.colorBlack,
        borderStyle: "solid",
        borderColor: Color.colorGray_300,
        borderWidth: 1,
        width: 353,
        height: StyleVariable.buttonSize,
        marginTop: 20,
        overflow: "hidden",
    },
    content: {
        width: '100%',
        height: '100%',
        paddingHorizontal: Padding.p_9xs,
    },
    defrostFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    defrostIcon: {
        width: 18,
        height: 19,
    },
    buttonCircle: {
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 0,
        elevation: 0,
        shadowOpacity: 1,
        borderRadius: Border.br_13xl,
        width: StyleVariable.buttonSize,
        height: StyleVariable.buttonSize,
        overflow: "hidden",
        justifyContent: "center",
        padding: Padding.p_7xs,
    },
    quickDefrost: {
        flex: 1,
        fontSize: FontSize.subheadlineEmphasized_size,
        letterSpacing: 0,
        lineHeight: 20,
        fontFamily: FontFamily.bodyRegular,
        textAlign: "left",
        marginLeft: 8,
    },
});

export default Defrost;