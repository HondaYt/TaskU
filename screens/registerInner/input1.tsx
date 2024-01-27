import React from 'react';
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
} from 'react-native';

import AttributeBtn from 'components/AttributeBtn'

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

interface RegisterInput1Props {
    setIsButtonDisabled: (disabled: boolean) => void;
}

export default function registerInput1() {

    return (
        <>

        </>
    );
}

const styles = StyleSheet.create({

});