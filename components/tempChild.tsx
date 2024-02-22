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

import Welcome from 'screens/Welcome'
import Btn from 'components/Btn'
import AttributeBtn from 'components/AttributeBtn'

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

type tempChildProps = {
    days: string[],
    time_required: number,
    // count: number,
    todo: string,
    onEditPress: () => void,
}
export default function TempChild({ days, time_required, todo, onEditPress }: tempChildProps) {

    return (
        <>
            <TouchableOpacity
                style={styles.tempInfo}
                onPress={onEditPress}
                activeOpacity={0.8}
            >
                <Text style={styles.title}>{todo}</Text>
                <Text style={styles.days}>{days?.join(',')}</Text>
                <Text style={styles.days}>所要時間:{time_required}分</Text>
                {/* <Btn
                    title='編集'
                    style={{
                        width: 60, height: 50,
                    }}
                /> */}
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    tempInfo: {
        backgroundColor: "#fff",
        width: buttonSize, // 正方形の幅
        // height: buttonSize / 2, // 正方形の高さ
        padding: 10,
        borderRadius: 10,
        justifyContent: 'flex-start', // 子要素を中央に配置
        alignItems: 'flex-start', // 子要素を中央に配置
        // overflow: 'hidden',
        // 影をつける
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 0
        },

    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        flexShrink: 1,
    },
    days: {
        fontSize: 14,
        fontWeight: "400",
        color: '#555',
    },
    tempInfoText: {
        fontSize: 18,
        fontWeight: "500",
        flexShrink: 1,
    },
    tempInfoCount: {
        fontSize: 36,
        fontWeight: "600",
    },
});