// Display.tsx

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import TemperatureSegmentedControl from "./temperature-segmented-control";
import TemperatureSetting from "./temperature-settings";

const MIN_TEMPERATURE = 0;
const MAX_TEMPERATURE = 40;

const Display: React.FC = () => {
    const [temperature, setTemperature] = useState<number>(35);

    const handleTemperatureChange = (newTemperature: number) => {
        // Clamp the temperature within bounds
        const clampedTemperature = Math.max(
            MIN_TEMPERATURE,
            Math.min(MAX_TEMPERATURE, newTemperature)
        );
        setTemperature(clampedTemperature);
    };

    const handleTemperaturePresetSelect = (preset: number) => {
        const clampedTemperature = Math.max(
            MIN_TEMPERATURE,
            Math.min(MAX_TEMPERATURE, preset)
        );
        setTemperature(clampedTemperature);
    };

    return (
        <View style={styles.display}>
            <View style={styles.navigation}>
                <TemperatureSetting
                    temperature={temperature}
                    onTemperatureChange={handleTemperatureChange}
                />
            </View>
            <TemperatureSegmentedControl
                onTemperaturePresetSelect={handleTemperaturePresetSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    navigation: {
        flexDirection: "row",
    },
    display: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20,
        marginTop: 20,
    },
});

export default Display;
