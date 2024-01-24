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

import Welcome from 'screens/Welcome'
import Btn from 'components/Btn'
import AttributeBtn from 'components/AttributeBtn'

type tempChildProps = {
    count: number,
    todo: string,
    onEditPress: () => void,
}
export default function TempChild({ count, todo, onEditPress }: tempChildProps) {

    return (
        <>
            <View style={styles.tempInfo}>
                <Text style={styles.tempInfoText}>
                    週に<Text style={styles.tempInfoCount}>{count}</Text>回、{todo}をする。
                </Text>
                <Btn
                    title='編集'
                    onPress={onEditPress}
                    style={{
                        width: 60, height: 50,
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    tempInfo: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: "tomato",
        flex: 1,
        width: '100%',
    },
    tempInfoText: {
        fontSize: 18,
        fontWeight: "500",
        flexShrink: 1,
    },
    tempInfoCount: {
        fontSize: 36,
        fontWeight: "600",
    },
});