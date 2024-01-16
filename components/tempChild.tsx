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

import Welcome from 'screens/welcome'
import Btn from 'components/btn'
import AttributeBtn from 'components/attributeBtn'

export default function TempChild() {

    return (
        <>
            <View style={styles.tempInfo}>
                <Text style={styles.tempInfoText}>
                    週に<Text style={styles.tempInfoCount}>2</Text>回、洗濯をする。
                </Text>
                <Btn
                    title='編集'
                    onPress={() => console.log('pressed')}
                    style={{ width: 60, height: 50 }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    tempInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
        // padding: 16,
        // borderRadius: 16,
    },
    tempInfoText: {
        fontSize: 18,
        fontWeight: "500",

    },
    tempInfoCount: {
        fontSize: 36,

        fontWeight: "600",
    },
});
