import React from 'react';
import { useEffect, useState } from 'react';
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

    TouchableOpacity
} from 'react-native';



const Stack = createNativeStackNavigator();

import BtnSection from 'components/btnSection'

import Welcome from 'screens/welcome'

type RegisterProps = {
    paddingTop: number,
    navigation: any;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export default function Register({ navigation, setProgress, paddingTop, ...props }: RegisterProps) {
    const nav = useNavigation();

    useEffect(() => {
        return nav.addListener('beforeRemove', (e) => {
            // スワイプバックが開始されたときに呼び出されます
            setProgress(prevProgress => prevProgress > 0 ? prevProgress - 1 : 0);
        });
    }, [nav, setProgress]);
    return (
        <View style={styles.main}>
            <View style={{ paddingTop, ...styles.container }}>
                <View style={{ ...styles.contents, paddingTop: 0 }}>
                    <Text></Text>
                </View>
                <BtnSection prevBtn='Welcome' nextBtn='' navigation={navigation} setProgress={setProgress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contents: {
        flex: 1,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    }
});
