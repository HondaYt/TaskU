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

    TouchableOpacity
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BtnSection from 'components/btnSection'

const Stack = createNativeStackNavigator();

type WelcomeProps = {
    navigation: any;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
};


export default function Welcome({ navigation, setProgress }: WelcomeProps) {
    return (
        <View style={styles.sectionContainer}>
            <SafeAreaView style={styles.container}>
                <View>
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
                        onPress={() => {
                            navigation.navigate('Register');
                            setProgress(prevProgress => prevProgress + 1);
                        }}>
                        <Text style={styles.btnText}>今すぐ始めよう</Text>
                    </TouchableOpacity>
                    <Text style={styles.tosText}>本サービスの利用開始をもって、{"\n"}
                        <Text style={styles.link}>利用規約</Text>と<Text style={styles.link}>プライバシーポリシー</Text>に同意したこととなります。</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({

    sectionContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // backgroundColor: "tomato",
        flex: 1,
        gap: 8,
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

