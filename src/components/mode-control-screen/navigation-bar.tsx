import { Color, FontFamily, FontSize, Padding } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


const NavigationBar: React.FC = () => {
    const handleBackPress = () => {
        router.push({
            pathname: "/",
            params: {
                resetOpacity: JSON.stringify(true)
            }
        })
    };

    return (
        <View style={styles.navigationBar}>
            <View style={styles.navigationItem}>
                <View>
                    <Pressable
                        style={[styles.leading, styles.leadingFlexBox]}
                        onPress={handleBackPress}
                    >
                        <Image
                            style={styles.chevronIcon}
                            contentFit="cover"
                            source={require("@/assets/images/control-screen/chevron.png")}
                        />
                        <Text style={[styles.label, styles.labelLayout]}>Back</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={[styles.trailing, styles.leadingFlexBox]}
                    >
                        <Image
                            style={styles.settingsIcon}
                            contentFit="cover"
                            source={require("@/assets/images/control-screen/settings.png")}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chevronIcon: {
        width: 12,
        height: 20,
    },
    navigationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Padding.p_5xs,
        paddingVertical: Padding.p_2xs,
    },
    leadingFlexBox: {
        alignItems: "center",
        flexDirection: "row",
        top: 0,
        position: "absolute",
    },
    trailing: {
        left: 25,
        paddingTop: Padding.p_2xs,
        paddingRight: Padding.p_base,
        paddingBottom: Padding.p_2xs,
    },
    labelLayout: {
        lineHeight: 22,
        letterSpacing: 0,
        fontSize: FontSize.bodyEmphasized_size,
    },
    label: {
        fontFamily: FontFamily.bodyRegular,
        color: Color.labelsSecondary,
        textAlign: "left",
        marginLeft: 3,
    },
    leading: {
        paddingHorizontal: Padding.p_5xs,
        paddingVertical: Padding.p_2xs,
        left: 0,
    },
    title: {
        top: "25%",
        left: "50.13%",
        fontWeight: "600",
        fontFamily: FontFamily.bodyEmphasized,
        color: Color.labelsPrimary,
        textAlign: "center",
        position: "absolute",
    },
    settingsIcon: {
        width: 25,
        height: 24,
    },
    navigationBar: {
        width: 393,
        paddingTop: Padding.p_35xl,
        left: 0,
        top: 0,
        position: "absolute",
    },
});

export default NavigationBar;