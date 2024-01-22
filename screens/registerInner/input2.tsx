import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import Welcome from 'screens/Welcome'
import Btn from 'components/btn'
import AttributeBtn from 'components/attributeBtn'
import TempChild from 'components/tempChild'
const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

interface RegisterInput2Props {
    setIsButtonDisabled: (disabled: boolean) => void;
}

export default function registerInput2({ setIsButtonDisabled }: RegisterInput2Props) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [tasks, setTasks] = useState([{ name: '洗濯', count: 3 }, { name: '掃除', count: 1 }]);
    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);

    const handlePresentModalPress = useCallback((index: number) => {
        setActiveTaskIndex(index);
        bottomSheetModalRef.current?.present();
    }, []);

    const incrementCount = () => {
        setTasks(prevTasks => prevTasks.map((task, i) => i === activeTaskIndex ? { ...task, count: task.count + 1 } : task));
    };

    const decrementCount = () => {
        setTasks(prevTasks => prevTasks.map((task, i) => i === activeTaskIndex ? { ...task, count: task.count > 0 ? task.count - 1 : 0 } : task));
    };

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <ScrollView contentContainerStyle={styles.content}>
                        {tasks.map((task, index) => (
                            <TempChild key={index} count={task.count} todo={task.name} onEditPress={() => handlePresentModalPress(index)} />
                        ))}
                    </ScrollView>
                    <BottomSheetModal
                        detached={true}
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={['25%']}
                        backgroundStyle={{
                            backgroundColor: '#fff',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                    >
                        <View style={styles.modalContainer}>
                            {activeTaskIndex !== null && (
                                <>
                                    <Btn
                                        title='-'
                                        prev
                                        style={{ width: 60, height: 60 }}
                                        onPress={decrementCount}
                                    />
                                    <View style={styles.modalCounter}><Text style={styles.modalCounterText}>{tasks[activeTaskIndex].count}</Text></View>
                                    <Btn
                                        title='+'
                                        style={{ width: 60, height: 60 }}
                                        onPress={incrementCount}
                                    />
                                </>
                            )}
                        </View>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({

    content: {
        // flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        backgroundColor: "#fff",
        padding: 16,
        // flexGrow: 1,
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        // flex: 1,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 3,
        width: buttonSize, // 正方形の幅
        height: buttonSize, // 正方形の高さ
        borderRadius: 16,
        justifyContent: 'center', // 子要素を中央に配置
        alignItems: 'center', // 子要素を中央に配置
    },
    modalContainer: {
        flexDirection: 'row',
        // backgroundColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCounter: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCounterText: {
        fontSize: 36,
        fontWeight: "600",
        color: "#333",
        textAlign: 'center',
    },
});