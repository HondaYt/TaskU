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

import Welcome from 'screens/Welcome'
import Main from 'screens/Main'
import Register from 'screens/Register'

const Stack = createNativeStackNavigator();



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
                            <Stack.Screen name="Main" component={Main} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
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