import { Border, Color, FontFamily, FontSize, Padding } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Display from "./display";
import FanSegmentedControl from "./fan-segmented-control";

const TemperatureControl: React.FC = () => {
    return (
        <LinearGradient
            style={styles.temperatureControl}
            colors={["rgba(18, 22, 36, 0)", "#121624"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.interior}>
                <Text style={styles.interiorTemperatureControl}>
                    Interior Temperature Control
                </Text>
                <FanSegmentedControl />
            </View>
            <View style={styles.activationThreshold}>
                <Text style={styles.interiorTemperatureControl}>
                    Activation Threshold
                </Text>
                <Display />
            </View>
            <Text style={styles.checkConditions}>Check conditions</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    temperatureControl: {
        borderRadius: Border.br_xl,
        borderStyle: "solid",
        borderColor: Color.colorGray_200,
        borderWidth: 1,
        alignItems: "center",
        padding: Padding.p_xl,
        marginTop: 20,
        alignSelf: "stretch",
    },
    interiorTemperatureControl: {
        fontSize: FontSize.bodyEmphasized_size,
        letterSpacing: 0,
        lineHeight: 22,
        fontWeight: "600",
        fontFamily: FontFamily.bodyEmphasized,
        color: Color.labelsPrimary,
        textAlign: "center",
    },
    interior: {
        alignItems: "center",
        justifyContent: "center"
    },
    activationThreshold: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    checkConditions: {
        fontSize: FontSize.captionRegular_size,
        lineHeight: 20,
        fontFamily: FontFamily.bodyRegular,
        color: Color.foregroundTertiary,
        textAlign: "left",
        marginTop: 20,
    },
});

export default TemperatureControl;