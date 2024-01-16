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
    style?: any;
    onPress: () => void;
    title: string;
    prev?: boolean;
    disabled?: boolean; // 追加
};

export default function Btn(props: btnProps) {
    const { prev, style, onPress, title, disabled } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                prev ? styles.prevBtn : styles.btn,
                style,
                disabled && styles.disabledBtn // 追加: 無効状態のスタイル
            ]}
            onPress={disabled ? undefined : onPress} // 追加: 無効の場合は onPress を無視
            disabled={disabled} // 追加
        >
            <Text
                style={[
                    prev ? styles.prevText : styles.text,
                    disabled && styles.disabledText // 追加: 無効状態のテキストスタイル
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
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
    disabledBtn: {
        // 無効状態のボタンのスタイル
        backgroundColor: "#ccc",
        // 他のスタイル属性
    },
    disabledText: {
        // 無効状態のテキストのスタイル
        color: "#999",
        // 他のスタイル属性
    },
});