import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import { Svg } from 'react-native-svg';
import { PieChart, ProgressCircle } from 'react-native-svg-charts';
import {
    SafeAreaView,
    Text,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    TouchableOpacity,
    ViewStyle
} from 'react-native';

const Stack = createNativeStackNavigator();

type insetShadowProps = {
    children: React.ReactNode;
    containerStyle?: ViewStyle;
}

export default function InsetShadow(props: insetShadowProps) {
    const shadows = Array(5).fill(null);

    return (
        <View style={styles.insetShadow}>
            <View style={styles.shadowBase}>
                {shadows.map((_, index) => (
                    <View key={index} style={styles.shadow} />
                ))}
                <View style={[styles.contentContainer, { ...props.containerStyle }]}>
                    {props.children}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        // backgroundColor: 'tomato',
    },
    insetShadow: {
        // margin: 8,
        position: 'relative',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    shadowBase: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ccc',

        borderRadius: 16,
    },
    shadow: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        margin: 6,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },

    },
});
