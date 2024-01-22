import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Animated,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';

import Input1 from 'screens/registerInner/Input1'
import Input2 from 'screens/registerInner/Input2'
import Input3 from 'screens/registerInner/Input3'
import Complete from 'screens/registerInner/Complete'
import Btn from 'components/btn'
import RegisterIndicator from 'components/registerIndicator'

const Stack = createNativeStackNavigator();

export default function Register({ navigation }: any) {
    // コンテンツのリストを定義
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const contents = [
        <Input1 setIsButtonDisabled={setIsButtonDisabled} />,
        <Input2 setIsButtonDisabled={setIsButtonDisabled} />,
        <Input3 />,
        <Complete />,
    ];
    // 現在のコンテンツのインデックスを追跡するための状態
    const [currentIndex, setCurrentIndex] = useState(0);
    const progressTexts = [
        `まずはあなたのことを${"\n"}教えてください！`,
        `あなたに最適な${"\n"}テンプレートはこちらです。`,
        `最後に、授業が終わる時間を${"\n"}教えてください！`,
        "登録が完了しました。"
    ];
    const [progressText, setProgressText] = useState(progressTexts[0]);

    useEffect(() => {
        setProgressText(progressTexts[currentIndex]);
    }, [currentIndex]);

    // 次のコンテンツに切り替える関数
    const handleNext = () => {
        setCurrentIndex(prevIndex => {
            // 最後のコンテンツに達したらそれ以上インデックスを増やさない
            const nextIndex = prevIndex + 1;
            return nextIndex < contents.length ? nextIndex : prevIndex;
        });
    };
    const handlePrev = () => {
        setCurrentIndex(prevIndex => {
            // 最初のコンテンツに達したらそれ以上インデックスを減らさない
            const nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : prevIndex;
        });
    };
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (currentIndex === contents.length - 1) {
            // 最後のコンテンツになったらフェードアウト
            Animated.timing(fadeAnim, {
                toValue: 0, // 完全に透明に
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            // それ以外の場合はフェードイン（不透明に戻す）
            Animated.timing(fadeAnim, {
                toValue: 1, // 完全に不透明に
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [currentIndex, contents.length, fadeAnim]);
    return (
        <>
            <View style={{ backgroundColor: '#fff' }}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <RegisterIndicator
                        progress={(currentIndex + 1)}
                        maxProgress={contents.length}
                        progressText={progressText}
                    />
                </Animated.View>
            </View>
            <View style={styles.content}>
                {contents[currentIndex]}
            </View>

            <View style={styles.btnContainer}>
                {currentIndex === 0 || currentIndex === contents.length - 1 ? null :
                    <Btn
                        prev
                        title='戻る'
                        onPress={handlePrev}
                    />
                }
                {currentIndex !== contents.length - 1 ?
                    <Btn
                        title='次へ進む'
                        style={{ flex: 1 }}
                        onPress={handleNext}
                        disabled={isButtonDisabled}
                    /> :
                    <Btn
                        title='TaskUを始める'
                        style={{ flex: 1 }}
                        onPress={() => navigation.navigate('Main')}
                    />
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        gap: 8,
        padding: 8,
        paddingLeft: 32,
        paddingRight: 32,

        justifyContent: "space-between",
    },

});

