import { Border, Color, FontFamily, FontSize } from "@/constants/theme";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

interface TemperatureSettingProps {
    temperature: number;
    onTemperatureChange: (newTemperature: number) => void;
}

const MIN_TEMPERATURE = 0;
const MAX_TEMPERATURE = 40;
const LONG_PRESS_DELAY = 500; // 500 milliseconds

const TemperatureSetting: React.FC<TemperatureSettingProps> = ({
    temperature,
    onTemperatureChange,
}) => {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const temperatureRef = useRef<number>(temperature);
    const minusAnimatedValue = useRef(new Animated.Value(1)).current;
    const plusAnimatedValue = useRef(new Animated.Value(1)).current;
    const [isMinusPressed, setIsMinusPressed] = useState(false);
    const [isPlusPressed, setIsPlusPressed] = useState(false);

    useEffect(() => {
        temperatureRef.current = temperature;
    }, [temperature]);

    const animateButton = (animatedValue: Animated.Value, toValue: number) => {
        Animated.spring(animatedValue, {
            toValue,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    };

    const changeTemperature = (delta: number) => {
        const newTemperature = temperatureRef.current + delta;
        const clampedTemperature = Math.max(
            MIN_TEMPERATURE,
            Math.min(MAX_TEMPERATURE, newTemperature)
        );
        if (clampedTemperature !== temperatureRef.current) {
            temperatureRef.current = clampedTemperature;
            onTemperatureChange(clampedTemperature);
        }
    };

    const startChangingTemperature = (delta: number) => {
        intervalRef.current = setInterval(() => {
            changeTemperature(delta);
        }, 100);
    };

    const stopChangingTemperature = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            stopChangingTemperature();
        };
    }, []);

    const getButtonAnimatedStyle = (animatedValue: Animated.Value) => ({
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                }),
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
        }),
    });

    return (
        <View style={styles.temperatureControl}>
            <Animated.View style={[getButtonAnimatedStyle(minusAnimatedValue)]}>
                <Pressable
                    onPressIn={() => {
                        setIsMinusPressed(true);
                        animateButton(minusAnimatedValue, 0);
                    }}
                    onPressOut={() => {
                        setIsMinusPressed(false);
                        animateButton(minusAnimatedValue, 1);
                        stopChangingTemperature();
                    }}
                    onPress={() => changeTemperature(-1)}
                    onLongPress={() => startChangingTemperature(-1)}
                    delayLongPress={LONG_PRESS_DELAY}
                    style={[
                        styles.button,
                        isMinusPressed && styles.buttonPressed
                    ]}
                >
                    <Image
                        style={styles.minusIcon}
                        contentFit="cover"
                        source={require("@/assets/images/control-screen/minus.png")}
                    />
                </Pressable>
            </Animated.View>

            <View style={styles.temperatureContainer}>
                <Text style={styles.text}>{temperature}°</Text>
            </View>

            <Animated.View style={[getButtonAnimatedStyle(plusAnimatedValue)]}>
                <Pressable
                    onPressIn={() => {
                        setIsPlusPressed(true);
                        animateButton(plusAnimatedValue, 0);
                    }}
                    onPressOut={() => {
                        setIsPlusPressed(false);
                        animateButton(plusAnimatedValue, 1);
                        stopChangingTemperature();
                    }}
                    onPress={() => changeTemperature(1)}
                    onLongPress={() => startChangingTemperature(1)}
                    delayLongPress={LONG_PRESS_DELAY}
                    style={[
                        styles.button,
                        styles.plusButton,
                        isPlusPressed && styles.buttonPressed
                    ]}
                >
                    <Image
                        style={styles.plusIcon}
                        contentFit="cover"
                        source={require("@/assets/images/control-screen/plus.png")}
                    />
                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    temperatureControl: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    temperatureContainer: {
        width: 80, // Fixed width for the temperature display
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        justifyContent: "center",
        height: 44,
        width: 44,
        borderWidth: 1,
        borderColor: Color.colorGray_300,
        borderStyle: "solid",
        backgroundColor: Color.colorBlack,
        borderRadius: Border.br_31xl,
        alignItems: "center",
    },
    buttonPressed: {
        backgroundColor: Color.colorGray_300,
    },
    minusIcon: {
        height: 4,
        width: 15,
    },
    text: {
        fontSize: FontSize.largeTitleEmphasized_size,
        letterSpacing: 0,
        lineHeight: 41,
        fontWeight: "700",
        fontFamily: FontFamily.largeTitleEmphasized,
        color: Color.foregroundSecondary,
        textAlign: "center",
    },
    plusIcon: {
        height: 16,
        width: 15,
    },
    plusButton: {},
});

export default TemperatureSetting;