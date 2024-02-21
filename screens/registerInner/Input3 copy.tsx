import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTimer } from 'components/TimerContext';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Platform,
    Button
} from 'react-native';

import Btn from 'components/Btn'
import TempChild from 'components/TempChild'
const Stack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

interface RegisterInput3Props {
    setIsButtonDisabled: (disabled: boolean) => void;
    livingCategory: string;
    statusCategory: string;
}

export default function registerInput3({ setIsButtonDisabled, livingCategory, statusCategory }: RegisterInput3Props) {
    const { setStartHour, setStartMinute, setEndHour, setEndMinute } = useTimer();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const initialTasks = useMemo(() => {
        if (livingCategory === '一人暮らし') {
            if (statusCategory === '社会人') {
                return [{ name: '洗濯', count: 3 }, { name: '掃除', count: 2 }];
            }
            else if (statusCategory === '主婦・主夫') {
                return [{ name: '洗濯', count: 3 }, { name: '掃除', count: 2 }];
            }
            return [{ name: '洗濯', count: 2 }, { name: '掃除', count: 1 }];
        }

        else if (livingCategory === '同居中') {
            if (statusCategory === '学生') {
                return [{ name: '洗濯', count: 0 }, { name: '掃除', count: 0 }];
            }
            else if (statusCategory === '社会人') {
                return [{ name: '洗濯', count: 2 }, { name: '掃除', count: 1 }];
            }
            else if (statusCategory === '主婦・主夫') {
                return [{ name: '洗濯', count: 4 }, { name: '掃除', count: 3 }];
            }
            return [{ name: '洗濯', count: 3 }, { name: '掃除', count: 2 }];
        }
        return [{ name: '洗濯', count: 0 }, { name: '掃除', count: 0 }];
    }, [livingCategory, statusCategory]);

    const [tasks, setTasks] = useState(initialTasks);



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

    const initialStartTime = new Date();
    initialStartTime.setHours(17, 0, 0, 0);
    const [startTime, setStartTime] = useState(initialStartTime);


    // 初期値を午後10時00分に設定
    const initialEndTime = new Date();
    initialEndTime.setHours(23, 0, 0, 0);
    const [endTime, setEndTime] = useState(initialEndTime);

    useEffect(() => {
        setStartHour(17);
        setStartMinute(0);
        setEndHour(23);
        setEndMinute(0);
    }, []);

    const onStartTimeChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setStartTime(selectedDate);
            setStartHour(selectedDate.getHours());
            setStartMinute(selectedDate.getMinutes());
        }
    };

    const onEndTimeChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setEndTime(selectedDate);
            setEndHour(selectedDate.getHours());
            setEndMinute(selectedDate.getMinutes());
        }
    };
    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <ScrollView contentContainerStyle={styles.content}>
                        {tasks.map((task, index) => (
                            <TempChild key={index} count={task.count} todo={task.name} onEditPress={() => handlePresentModalPress(index)} />
                        ))}
                        <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, alignItems: "center" }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Text>開始時間</Text>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={startTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onStartTimeChange}
                                />
                            </View>
                            <Text>〜</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Text>終了時間</Text>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={endTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onEndTimeChange}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <BottomSheetModal
                        detached={true}
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={['25%']}
                        backgroundStyle={{
                            borderBottomEndRadius: 0,
                            borderBottomStartRadius: 0,
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