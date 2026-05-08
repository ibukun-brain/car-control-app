import Car from '@/components/mode-control-screen/car';
import Modal from '@/components/mode-control-screen/modal';
import NavigationBar from '@/components/mode-control-screen/navigation-bar';
import { Color } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ModeControlScreen = () => {
    return (
        <GestureHandlerRootView>
            <View style={styles.modeControlScreenNormal}>
                <NavigationBar />
                <Car />
                <Modal />
            </View>
        </GestureHandlerRootView>
    )
}

export default ModeControlScreen

const styles = StyleSheet.create({
    modeControlScreenNormal: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 60,
        },
        shadowRadius: 100,
        elevation: 100,
        shadowOpacity: 1,
        borderRadius: 40,
        backgroundColor: Color.colorBlack,
        flex: 1,
        width: "100%",
        height: 852,
        overflow: "hidden",
    },
});