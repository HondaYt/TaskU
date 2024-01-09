import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,

    TouchableOpacity
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();


type btnSectionProps = {
    prevBtn: string,
    nextBtn: string,
}

export default function BtnSection({ prevBtn, nextBtn, navigation, setProgress }: btnSectionProps & { navigation: any, setProgress: (value: ((prevState: number) => number)) => void }) {
    return (
        <View style={styles.btnWrap}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => {
                    navigation.navigate(nextBtn);
                    setProgress(prevProgress => prevProgress + 1);
                }}>
                <Text style={styles.btnText}>次に進む</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btn, styles.prevBtn]}
                onPress={() => {
                    navigation.navigate(prevBtn);
                    setProgress(prevProgress => prevProgress > 0 ? prevProgress - 1 : 0);
                }}>
                <Text style={[styles.btnText, styles.prevBtnText]}>戻る</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    btnWrap: {
        // backgroundColor: "tomato",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 8,
        gap: 8,
    },
    btnContainer: {
    },
    btn: {
        backgroundColor: "#333",
        borderRadius: 8,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20,
    },
    prevBtn: {
        backgroundColor: "#fff",
        borderColor: "#555",
        borderWidth: 3,
    },
    prevBtnText: {
        color: "#555",
        fontSize: 18,
    },
})