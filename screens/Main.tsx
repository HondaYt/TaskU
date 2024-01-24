import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PieChart, ProgressCircle } from 'react-native-svg-charts';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
const Stack = createNativeStackNavigator();
import Home from 'screens/MainInner/Home'
import Tasks from 'screens/MainInner/Tasks'
import History from 'screens/MainInner/History'
import { Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['right', 'top', 'left']}>
            <Tab.Navigator
                // initialRouteName="Home"
                screenOptions={{ headerShown: false, tabBarActiveTintColor: '#44c951', }}


            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    // iconを追加
                    options={{
                        tabBarLabel: 'ホーム', tabBarIcon: ({ color }) => (
                            <Octicons name="home" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Tasks"
                    component={Tasks}
                    options={{
                        tabBarLabel: 'タスク', tabBarIcon: ({ color }) => (
                            <Octicons name="paste" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={History}
                    options={{
                        tabBarLabel: '履歴', tabBarIcon: ({ color }) => (
                            <Octicons name="history" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
});