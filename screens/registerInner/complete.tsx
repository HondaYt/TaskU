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
import Btn from 'components/btn'
const Stack = createNativeStackNavigator();

export default function Complete({ navigation }: any) {
    return (
        <View style={styles.content}>
            <View>
                <Text style={styles.ttl}>Complete</Text>
            </View>
            <View style={styles.WelcomeBtnContainer}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    ttl: {
        fontSize: 66,
        fontWeight: "600",
    },
    subTtl: {
        fontWeight: "500",
        fontSize: 26,
        lineHeight: 35,
    },
    WelcomeBtnContainer: {
        flex: 1,
        gap: 8,
        padding: 8,
        justifyContent: "flex-end",
        // backgroundColor: "blue",
    },
    tosText: {
        paddingTop: 4,
        height: 60,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
    },
    link: {
        textDecorationLine: "underline",
        color: "#555",
    },
});

