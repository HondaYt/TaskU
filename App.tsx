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
import Top from 'screens/top'
import Register from 'screens/register'
const Stack = createNativeStackNavigator();

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
        position: 'relative',

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default function App() {
    return (
        <SafeAreaProvider>
            <View style={styles.screen}>
                <SafeAreaView style={styles.container}>
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                                gestureEnabled: false,
                            }}>
                            <Stack.Screen name="Welcome" component={Welcome} />
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="Top" component={Top} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
}