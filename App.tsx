import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance } from 'react-native';

import Welcome from 'screens/Welcome'
import Main from 'screens/Main'
import Register from 'screens/Register'

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <SafeAreaProvider>
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
        </SafeAreaProvider>
    );
}