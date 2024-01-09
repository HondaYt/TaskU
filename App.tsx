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


const Stack = createNativeStackNavigator();

import BtnSection from 'components/btnSection'
import RegisterIndicator from 'components/registerIndicator'

import Welcome from 'screens/welcome'
import Register from 'screens/register'


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
  const [progress, setProgress] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0); // 新しいstateを追加

  return (
    <SafeAreaProvider>
      <View style={styles.screen}>
        <SafeAreaView style={styles.container}>
          <RegisterIndicator progress={progress} onHeightChange={setIndicatorHeight} ></RegisterIndicator>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome">
                {(props) => <Welcome {...props} setProgress={setProgress} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {(props) => <Register {...props} setProgress={setProgress} paddingTop={indicatorHeight} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}