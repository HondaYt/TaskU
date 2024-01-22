import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import { PieChart, ProgressCircle } from 'react-native-svg-charts';
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


import Welcome from 'screens/Welcome'
import Register from 'screens/Register'

const Stack = createNativeStackNavigator();

export default function Top() {

    return (
        <View style={styles.content}>
            <View >
                <Text>おはようございます</Text>
                <Text>ゲストさん</Text>
                <Text>今日は2024/01/22</Text>
            </View>
            <ProgressCircle
                style={{ height: 200 }}
                progress={0.9}
                progressColor={'rgb(134, 65, 244)'}
                strokeWidth={20}
            // cornerRadius={0}
            // endAngle={1}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    content: {
        // justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
});
