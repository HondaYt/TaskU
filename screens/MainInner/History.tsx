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
                <Text>あああ</Text>

            </View>
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
