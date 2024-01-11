import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

import Welcome from 'screens/welcome'
const Stack = createNativeStackNavigator();

type btnProps = {
    prev?: boolean;
    style?: any;
    onPress: () => void;
    title: string;
};

export default function Btn(props: btnProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{ ...props.prev ? styles.prevBtn : styles.btn, ...props.style }}
            // style={[styles.btn, props.style]}
            onPress={props.onPress}>
            <Text
                style={{ ...props.prev ? styles.prevText : styles.text }}
            >{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btn: {
        // width: '100%',
        // flex: 1,
        height: 60,
        backgroundColor: "#333",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 20,
    },
    prevText: {
        color: "#555",
        fontWeight: "600",
        fontSize: 20,
    },
    prevBtn: {
        width: 60,
        borderWidth: 3,
        borderColor: "#555",
        backgroundColor: "#fff",

        borderRadius: 8,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'tomato',
    },
});