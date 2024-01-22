import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PieChart, ProgressCircle } from 'react-native-svg-charts';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import Top from 'screens/MainInner/Top'
import Tasks from 'screens/MainInner/Tasks'

export default function Main() {

    return (
        <Tab.Navigator
            screenOptions={{
                // headerShown: false,
                // gestureEnabled: false,
            }}>
            <Tab.Screen name="Top" component={Top} />
            <Tab.Screen name="Tasks" component={Tasks} />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
});