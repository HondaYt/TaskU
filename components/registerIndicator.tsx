import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Animated,
    TouchableOpacity
} from 'react-native';


const Stack = createNativeStackNavigator();


import BtnSection from 'components/btnSection'

import Welcome from 'screens/welcome'
import Register from 'screens/register'

type registerIndicatorProps = {
    progress: number,
    onHeightChange: (height: number) => void, // 新しいpropsを追加
}

export default function RegisterIndicator({ progress, onHeightChange }: registerIndicatorProps) {
    const [height, setHeight] = useState(0); // heightの状態を追加

    const onLayout = (event: { nativeEvent: { layout: { height: any; }; }; }) => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
        onHeightChange(height); // 高さが変わったときに親コンポーネントに通知
    };

    const lastProgress = 5;
    const insets = useSafeAreaInsets();
    const initialFade = progress === 0 || progress === lastProgress ? 0 : 1;
    const initialWidth = (100 / lastProgress) * progress;
    const widthAnim = useRef(new Animated.Value(initialWidth)).current;
    const fadeAnim = useRef(new Animated.Value(initialFade)).current;

    useEffect(() => {
        if (progress === 0 || progress === lastProgress) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [progress]);

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: (100 / lastProgress) * progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    return (
        <Animated.View style={{ ...styles.registerIndicator, paddingTop: insets.top, opacity: fadeAnim }}>
            <View onLayout={onLayout}>
                <Text style={styles.progressText}>まずはあなたのことを{"\n"}教えてください！</Text>
                <View style={styles.progressBar}>
                    <Animated.View style={{
                        ...styles.progressIndicator, width: widthAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                        })
                    }} />
                </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flex: 1,
        zIndex: 100,
        // paddingTop: StatusBar.currentHeight,
    },
});
