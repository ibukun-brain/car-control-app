import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Color } from "../constants/theme";

export default function RootLayout() {
  return <Stack screenOptions={{
    contentStyle: styles.contentStyle,
    headerRight: (props) => {
      return <Pressable>
        <Image style={styles.settingsIcon}
          contentFit="cover"
          source={require("@/assets/images/control-screen/settings.png")} />
      </Pressable>
    },
  }}>
    <Stack.Screen name="index" options={{
      headerShadowVisible: false,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      headerTitleAlign: "center",
      headerTitle: "Controls",
    }} />
    <Stack.Screen name="onboarding" options={{
      headerShown: false,
    }} />
    <Stack.Screen name="mode-control" options={{
      headerShown: false,
      presentation: "modal",
      animation: "slide_from_bottom"
    }} />
  </Stack>;
}

const styles = StyleSheet.create({
  settingsIcon: {
    width: 25,
    height: 24,
  },
  headerTitleStyle: {
    fontWeight: "normal",
    fontSize: 18,
    color: Color.labelsPrimary
  },
  headerStyle: {
    backgroundColor: Color.colorBlack
  },
  contentStyle: {
    backgroundColor: Color.colorBlack,
  }
})