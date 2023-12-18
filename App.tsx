import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Welcome({ navigation }) {
  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.subTitle}>
            大切なあなたの時間を守る、{"\n"}
            タスク管理アプリ。
          </Text>
          <Text style={styles.title}>TaskU</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.getStartBtn}
            onPress={() => navigation.navigate('Details')}>
            <Text style={styles.getStartBtnText}>今すぐ始めよう</Text>
          </TouchableOpacity>
          <Text style={styles.tosText}>本サービスの利用開始をもって、{"\n"}
            <Text style={styles.link}>利用規約</Text>と<Text style={styles.link}>プライバシーポリシー</Text>に同意したこととなります。</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: "tomato",
    flex: 1,
    gap: 10, // 子要素間のスペースを10ピクセルに設定します
  },
  subTitle: {
    fontWeight: "500",
    fontSize: 26,
  },
  title: {
    fontSize: 66,
    fontWeight: "600",
  },
  btnContainer: {
    height: 200,
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  getStartBtn: {
    backgroundColor: "#333",
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  getStartBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  tosText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    textDecorationLine: "underline",
    color: "#555",
  }
});
