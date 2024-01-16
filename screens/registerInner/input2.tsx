import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Animated,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Welcome from 'screens/welcome'
import Btn from 'components/btn'
import AttributeBtn from 'components/attributeBtn'
import TempChild from 'components/tempChild'
const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

interface RegisterInput1Props {
    setIsButtonDisabled: (disabled: boolean) => void;
}

export default function registerInput1({ setIsButtonDisabled }: RegisterInput1Props) {

    return (
        <>
            <ScrollView contentContainerStyle={styles.content}>
                <TempChild />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({

    content: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        backgroundColor: "#fff",
        padding: 16,
        flexGrow: 1,
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        // flex: 1,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 3,
        width: buttonSize, // 正方形の幅
        height: buttonSize, // 正方形の高さ
        borderRadius: 16,
        justifyContent: 'center', // 子要素を中央に配置
        alignItems: 'center', // 子要素を中央に配置
    },
});