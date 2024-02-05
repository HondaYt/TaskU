import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import { Svg } from 'react-native-svg';

import {
    SafeAreaView,
    Text,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';


import Welcome from 'screens/Welcome'
import Register from 'screens/Register'
import InsetShadow from 'components/InsetShadow'
export default function Timer({ setIsTimerZero }: { setIsTimerZero: (isZero: boolean) => void }) {

    const initialTime = 0.005 * 60 * 60; // 初期値は0.1時間（秒単位）
    const [time, setTime] = useState<number>(initialTime);
    const [width, setWidth] = useState<number>(100); // 初期値は100

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId); // 残り時間が0になったらタイマーを停止
                    setTimeout(() => {
                        setIsTimerZero(true); // 残り時間が0になったら、setIsTimerZeroを呼び出す
                        setWidth(0);
                    }, 0);
                    return 0;
                }
                const newTime = prevTime - 1;
                const newWidth = (newTime / initialTime) * 100; // 残り時間に応じてwidthを計算
                setWidth(newWidth);
                return newTime;
            });
        }, 1000); // 1秒ごとに時間を減らす

        return () => {
            clearInterval(timerId); // コンポーネントがアンマウントされるときにタイマーをクリア
        };
    }, []);

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formatTime = (time: number) => time < 10 ? `0${time}` : `${time}`;

    const remaining = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    return (
        <View style={styles.timer}>
            <InsetShadow containerStyle={{ alignItems: 'flex-end', position: 'relative', justifyContent: 'center' }}>
                <View style={[styles.remaining, { width: `${width}%` }]} >
                    <View style={{ width: 150 }}>
                        <Text style={styles.remainingText}>{remaining}</Text>
                    </View>
                </View>
                <View style={{ width: 150, position: 'absolute', zIndex: -1 }}>
                    <Text style={[styles.remainingText, { color: '#67DD73' }]}>{remaining}</Text>
                </View>
            </InsetShadow>
        </View>
    );
}

const styles = StyleSheet.create({
    timer: {
        height: 72,
        width: '100%',

    },
    remaining: {
        overflow: 'hidden',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#67DD73',

    },
    remainingText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },



});
