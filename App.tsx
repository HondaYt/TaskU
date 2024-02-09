import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { UserInfoProvider } from 'components/UserInfoContext'
import { UserTimezoneDateProvider } from 'components/UserTimezoneDateContext'
import { TaskProvider, useTasks } from 'components/TaskContext';
// import { TimerProvider } from 'components/useTimer';
import { TimerProvider } from './components/TimerContext';
import Welcome from 'screens/Welcome'
import Main from 'screens/Main'
import Register from 'screens/Register'

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <SafeAreaProvider>
            <UserInfoProvider>
                <UserTimezoneDateProvider>
                    <TimerProvider>
                        <TaskProvider>
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                keyboardVerticalOffset={Platform.OS === "ios" ? -80 : 0}
                            >
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
                            </KeyboardAvoidingView>
                        </TaskProvider>
                    </TimerProvider>
                </UserTimezoneDateProvider>
            </UserInfoProvider>
        </SafeAreaProvider>
    );
}