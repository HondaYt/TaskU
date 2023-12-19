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


function Welcome({ navigation }: { navigation: any }) {
  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.ttlSection}>
          <Text style={styles.subTtl}>
            大切なあなたの時間を守る、{"\n"}
            タスク管理アプリ。
          </Text>
          <Text style={styles.ttl}>TaskU</Text>
        </View>
        <View style={styles.WelcomeBtnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => navigation.navigate('Details')}>
            <Text style={styles.btnText}>今すぐ始めよう</Text>
          </TouchableOpacity>
          <Text style={styles.tosText}>本サービスの利用開始をもって、{"\n"}
            <Text style={styles.link}>利用規約</Text>と<Text style={styles.link}>プライバシーポリシー</Text>に同意したこととなります。</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

function DetailsScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView style={styles.container}>
        <View>

        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.btnText}>次に進む</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, styles.prevBtn]}
            onPress={() => navigation.navigate('Welcome')}>
            <Text style={[styles.btnText, styles.prevBtnText]}>戻る</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  ttlSection: {

  },
  ttl: {
    fontSize: 66,
    fontWeight: "600",
  },
  subTtl: {
    fontWeight: "500",
    fontSize: 26,
    lineHeight: 35,
  },
  WelcomeBtnContainer: {
    // height: 200,
    gap: 8,
    padding: 8,
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  btnContainer: {

    // height: 200,
    gap: 8,
    padding: 8,
    // backgroundColor: "blue",
  },
  btn: {
    backgroundColor: "#333",
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  prevBtn: {
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 3,
  },
  prevBtnText: {
    color: "#555",
    fontSize: 18,
  },
  tosText: {
    paddingTop: 8,
    height: 60,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    textDecorationLine: "underline",
    color: "#555",
  }
});



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
