import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren, ReactNode } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Welcome from 'screens/Welcome'
import Btn from 'components/Btn'
const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

type attributeBtnProps = {
    title: string;
    onPress: () => void;
    selected: boolean; // 選択されているかどうかの状態を追加
    icon: any;
};

export default function AttributeBtn({ title, onPress, selected, icon }: attributeBtnProps) {
    const [fontSize, setFontSize] = useState(30);
    const [pressed, setPressed] = useState(false);

    const handlePress = () => {
        setPressed(!pressed);
        onPress();
    };

    const onTextLayout = (e: { nativeEvent: { lines: any; }; }) => {
        const { lines } = e.nativeEvent;
        if (lines.length > 1) {
            // テキストが複数行にわたる場合、フォントサイズを小さくする
            setFontSize(prevFontSize => prevFontSize * 0.9);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.attributeBtn, selected && styles.selected]}
            onPress={onPress}
        >

            <View style={{ position: 'absolute', top: -36, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                {icon}

                {/* <LivingAloneImg height={buttonSize / 2} width={buttonSize / 2} /> */}
            </View>
            <View onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                // テキストの幅がボタンの幅を超えた場合、フォントサイズを調整
                if (width > buttonSize) {
                    setFontSize(prevFontSize => Math.max(prevFontSize * (buttonSize / width), 12)); // 最小フォントサイズを12に設定
                }
            }}>
                <Text
                    style={[styles.text, { fontSize }]}
                    onTextLayout={onTextLayout}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>
            {!selected ?
                <Octicons name="check-circle" size={28} color="#ddd" style={{ position: 'absolute', top: 8, right: 8 }} />
                :
                <>

                    <Octicons name="check-circle" size={28} color="#fff" style={{ position: 'absolute', top: 8, right: 8 }} />
                    <Octicons name="check-circle-fill" size={28} color="#67DD73" style={{ position: 'absolute', top: 8, right: 8 }} />
                </>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#888",
        borderWidth: 3,
        width: buttonSize, // 正方形の幅
        height: buttonSize, // 正方形の高さ
        padding: 10,
        borderRadius: 16,
        justifyContent: 'flex-end', // 子要素を中央に配置
        alignItems: 'flex-end', // 子要素を中央に配置
        overflow: 'hidden',
    },
    text: {
        color: "#333",
        fontWeight: "800",
        textAlign: "right",
        // fontSize: 30,
    },
    selected: {
        backgroundColor: "#eee", // 押されたときの背景色
        borderColor: "#333", // 押されたときの境界線の色
        // 他に変更したいスタイルがあればここに追加
    },
});