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
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';

import Welcome from 'screens/welcome'
const Stack = createNativeStackNavigator();


type registerIndicatorProps = {
    progress: number;
    maxProgress: number;
};
export default function RegisterIndicator({ progress, maxProgress }: registerIndicatorProps) {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: (100 / maxProgress) * progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress, maxProgress, widthAnim]);


    return (
        <Animated.View style={styles.registerIndicator}>
            <Text style={styles.progressText}>まずはあなたのことを{"\n"}教えてください！</Text>
            <View style={styles.progressBar}>
                <Animated.View style={{
                    ...styles.progressIndicator,
                    width: widthAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    })
                }} />
            </View>
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    progressText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#EAEAEA',
    },
    progressIndicator: {
        height: 8,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#FFB6B6',
    },
    registerIndicator: {
        backgroundColor: '#fff',
        // paddingTop: StatusBar.currentHeight,
    },
});
