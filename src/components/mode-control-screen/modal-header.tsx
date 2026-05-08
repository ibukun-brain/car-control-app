import { Color, FontFamily, FontSize } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const ModalHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Mode Control</Text>
            <View style={styles.temperature}>
                <Text style={styles.interiorTypo}>Exterior 32°</Text>
                <Image
                    style={styles.temperatureChild}
                    contentFit="cover"
                    source={require("@/assets/images/control-screen/ellipse-829.png")}
                />
                <Text style={[styles.interior351, styles.interiorTypo]}>
                    Interior 20°
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    interiorTypo: {
        textAlign: "left",
        color: Color.colorGray_100,
        fontFamily: FontFamily.bodyRegular,
        lineHeight: 21,
        fontSize: FontSize.calloutRegular_size,
        letterSpacing: 0,
    },
    title: {
        fontSize: FontSize.title3Emphasized_size,
        lineHeight: 25,
        fontWeight: "600",
        fontFamily: FontFamily.bodyEmphasized,
        color: Color.labelsPrimary,
        textAlign: "center",
        letterSpacing: 0,
        alignSelf: "stretch",
    },
    temperatureChild: {
        width: 4,
        height: 4,
        marginLeft: 10,
    },
    interior351: {
        marginLeft: 10,
    },
    temperature: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        alignSelf: "stretch",
        alignItems: "center",
    },
    header: {
        width: 188,
        alignItems: "center",
    },
});

export default ModalHeader;
