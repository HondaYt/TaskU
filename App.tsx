import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Welcome to TaskU!!</Text>
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    // backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
