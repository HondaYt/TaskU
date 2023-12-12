import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <View style={styles.sectionContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.subTitle}>
          大切なあなたの時間を守る、{"\n"}
          タスク管理アプリ。
        </Text>
        <Text style={styles.title}>TaskU</Text>
        {/* <button></button> */}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    // backgroundColor: "tomato",
    flex: 1,
    padding: 10,
  },
  container: {
    flexDirection: 'column', // 子要素を縦方向に並べます
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
});



export default App