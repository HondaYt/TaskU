import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, StyleSheet, View, } from 'react-native';

import Btn from 'components/Btn'
import RegisterIndicator from 'components/RegisterIndicator'

import Input1 from 'screens/registerInner/Input1'
import Input2 from 'screens/registerInner/Input2'
import Input3 from 'screens/registerInner/Input3'
import Complete from 'screens/registerInner/Complete'

import { Octicons } from '@expo/vector-icons';
export default function Register({ navigation }: any) {
    // ユーザー情報の状態を追加


    // コンテンツのリストを定義
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const contents = [
        <Input1 />,
        <Input2 setIsButtonDisabled={setIsButtonDisabled} />,
        <Input3 setIsButtonDisabled={setIsButtonDisabled} />,
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
            const nextIndex = prevIndex - 1;
            if (nextIndex >= 0) {
                // Input1に戻るときにボタンを有効にする
                if (nextIndex === 0) {
                    setIsButtonDisabled(false);
                }
                return nextIndex;
            }
            return prevIndex;
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['right', 'top', 'left']}>
            <View>
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
                        title={<Octicons name="chevron-left" size={32} color="#555" />}
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
        </SafeAreaView>
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
        paddingBottom: 34 + 8,
    },

});
