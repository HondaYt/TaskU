import React, { useEffect, useState } from 'react';
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
// import useTimer from 'components/useTimer';
import { useTimer } from './TimerContext';
export default function Timer({ setIsTimerZero }: { setIsTimerZero: (isZero: boolean) => void }) {

    const { time, width } = useTimer();

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
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
