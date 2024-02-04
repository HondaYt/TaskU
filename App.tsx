import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance } from 'react-native';

import { UserInfoProvider } from 'components/UserInfoProvider'
import { UserTimezoneDateProvider } from 'components/UserTimezoneDateProvider'
import { TaskProvider } from 'components/TaskProvider';

import Welcome from 'screens/Welcome'
import Main from 'screens/Main'
import Register from 'screens/Register'

const Stack = createNativeStackNavigator();

export default function App({ userInfo, setUserInfo }: any) {
    return (
        <SafeAreaProvider>
            <UserInfoProvider>
                <UserTimezoneDateProvider>
                    <TaskProvider>
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
                    </TaskProvider>
                </UserTimezoneDateProvider>
            </UserInfoProvider>
        </SafeAreaProvider>
    );
}