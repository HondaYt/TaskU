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
    Button,
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

export default function btnSection({ prevBtn, nextBtn, navigation }: btnSectionProps & { navigation: any }) {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => navigation.navigate(nextBtn)}>
                <Text style={styles.btnText}>次に進む</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btn, styles.prevBtn]}
                onPress={() => navigation.navigate(prevBtn)}>
                <Text style={[styles.btnText, styles.prevBtnText]}>戻る</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {

        // height: 200,
        gap: 8,
        padding: 8,
        // backgroundColor: "blue",
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