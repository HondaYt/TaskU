import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react'; // Added TextStyle import
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    ViewStyle,
    TextStyle,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';

const Stack = createNativeStackNavigator();

type btnProps = {
    style?: ViewStyle;
    textStyle?: TextStyle;
    onPress: () => void;
    title: any;
    prev?: boolean;
    disabled?: boolean;
};

export default function Btn(props: btnProps) {
    const { prev, style, onPress, title, disabled, textStyle } = props; // Added textStyle to destructuring
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                prev ? styles.prevBtn : styles.btn,
                style,
                disabled && styles.disabledBtn
            ]}
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
        >
            <Text
                style={[
                    prev ? styles.prevText : styles.text,
                    disabled && styles.disabledText,
                    textStyle
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
    },
    disabledBtn: {
        backgroundColor: "#ccc",
    },
    disabledText: {
        color: "#999",
    },
});