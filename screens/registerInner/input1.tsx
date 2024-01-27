import React, { useId } from 'react';
import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import {
    ScrollView,
    Animated,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Image,
} from 'react-native';

import AttributeBtn from 'components/AttributeBtn'

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

interface RegisterInput1Props {
    userInfo: any;
    setUserInfo: (userInfo: any) => void;
}

export default function registerInput1({ userInfo, setUserInfo }: RegisterInput1Props) {
    // ユーザー名と画像URLを取得
    const userName = userInfo?.user?.name;
    const userImage = userInfo?.user?.photo;
    const userId = userInfo?.user?.id;

    return (
        <>
            <View style={styles.content}>
                {/* ユーザー名と画像を表示 */}
                <Text>{userName}</Text>
                <Text>{userId}</Text>
                <Image source={{ uri: userImage }} style={styles.userImage} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 16,
        backgroundColor: "#fff",
        padding: 16,
    },
    userImage: {
        width: 100, // 画像の幅
        height: 100, // 画像の高さ
        borderRadius: 50, // 画像を円形にする
    },
});