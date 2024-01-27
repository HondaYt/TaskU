import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Btn from 'components/Btn'
import GoogleAuthBtn from 'components/Auth.native';

export default function App({ navigation }: any) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.subTtl}>
                        大切なあなたの時間を守る、{"\n"}
                        タスク管理アプリ。
                    </Text>
                    <Text style={styles.ttl}>TaskU</Text>
                </View>
                <View style={styles.WelcomeBtnContainer}>
                    {/* <Btn
                        title='今すぐ始めよう'
                        onPress={() => navigation.navigate('Register')}
                    /> */}
                    <GoogleAuthBtn navigation={navigation} />
                    <Text style={styles.tosText}>本サービスの利用開始をもって、{"\n"}
                        <Text style={styles.link}>利用規約</Text>
                        と<Text style={styles.link}>プライバシーポリシー</Text>
                        に同意したこととなります。
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
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
        flex: 1,
        gap: 8,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: "flex-end",
        // backgroundColor: "blue",
    },
    tosText: {
        paddingTop: 4,
        height: 60,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
    },
    link: {
        textDecorationLine: "underline",
        color: "#555",
    },
});

