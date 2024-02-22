import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTimer } from 'components/TimerContext';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
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

const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

interface RegisterInput3Props {
    setIsButtonDisabled: (disabled: boolean) => void;
    livingCategory: string;
    statusCategory: string;
}

export default function registerInput3({ setIsButtonDisabled, livingCategory, statusCategory }: RegisterInput3Props) {
    const toggleDaySelection = (day: string) => {
        setLivingTasks(currentTasks => currentTasks.map((task, index) => {
            if (index === activeTaskIndex) {
                const isDaySelected = task.days.includes(day);
                let newDays = isDaySelected ? task.days.filter(d => d !== day) : [...task.days, day];
                // 曜日を正しい順序でソート
                const dayOrder = dayOfWeek;
                newDays = newDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
                return {
                    ...task,
                    days: newDays,
                };
            }
            return task;
        }));
    };
    const { setStartHour, setStartMinute, setEndHour, setEndMinute } = useTimer();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const initialTasks = useMemo(() => {
        if (livingCategory === '一人暮らし') {
            if (statusCategory === '学生') {
                return [{ name: '洗濯', days: ['月', '水', '土'], time_required: 20 },
                { name: '掃除', days: ['日'], time_required: 30 }];
            }
            else if (statusCategory === '社会人') {
                return [{ name: '洗濯', days: ['水', '土'], time_required: 30 },
                { name: '掃除', days: ['日', '木'], time_required: 30 }];
            }
            else if (statusCategory === '主婦・主夫') {
                return [{ name: '洗濯', days: ['土', '月', '水', '金'], time_required: 40 },
                { name: '掃除', days: ['日', '火', '木'], time_required: 30 }];
            }
            return [{ name: '洗濯', days: ['月', '水', '土'], time_required: 30 },
            { name: '掃除', days: ['日', '木'], time_required: 30 }];
        }

        else if (livingCategory === '同居中') {
            if (statusCategory === '学生') {
                return [{ name: '洗濯', days: [], time_required: 0 },
                { name: '掃除', days: [], time_required: 0 }];
            }
            else if (statusCategory === '社会人') {
                return [{ name: '洗濯', days: ['土', '水'], time_required: 30 },
                { name: '掃除', days: ['日', '木'], time_required: 30 }];
            }
            else if (statusCategory === '主婦・主夫') {
                return [{ name: '洗濯', days: ['土', '月', '水', '金'], time_required: 40 },
                { name: '掃除', days: ['日', '火', '木'], time_required: 30 }];
            }
            return [{ name: '洗濯', days: ['土', '月', '水', '金'], time_required: 30 },
            { name: '掃除', days: ['日', '火', '木'], time_required: 30 }];
        }
        return [{ name: '洗濯', days: [], time_required: 0 },
        { name: '掃除', days: [], time_required: 0 }];
    }, [livingCategory, statusCategory]);

    const [livingTasks, setLivingTasks] = useState(initialTasks);

    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);

    const [taskName, setTaskName] = useState('');
    const [timeRequired, setTimeRequired] = useState(0);

    useEffect(() => {
        if (activeTaskIndex !== null) {
            const activeTask = livingTasks[activeTaskIndex];
            setTaskName(activeTask.name);
            setTimeRequired(activeTask.time_required);
        }
    }, [activeTaskIndex, livingTasks]);

    const handleTaskNameChange = (text: string) => {
        setTaskName(text);
    };

    const handleTimeRequiredChange = (number: number) => {
        setTimeRequired(number);
    };

    const saveTaskChanges = () => {
        setLivingTasks(currentTasks => currentTasks.map((task, index) => {
            if (index === activeTaskIndex) {
                return {
                    ...task,
                    name: taskName,
                    time_required: timeRequired,
                };
            }
            return task;
        }));
        bottomSheetModalRef.current?.dismiss();
    };


    const handlePresentModalPress = useCallback((index: number) => {
        setActiveTaskIndex(index);
        bottomSheetModalRef.current?.present();
    }, []);


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
                        <View style={styles.wrap}>
                            {livingTasks.map((task, index) => (
                                <TempChild key={index} days={task.days} todo={task.name} time_required={task.time_required} onEditPress={() => handlePresentModalPress(index)} />
                            ))}
                        </View>
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
                                    themeVariant="light"
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
                                    themeVariant="light"
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <BottomSheetModal
                        detached={true}
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={[200]}
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
                    // keyboardBehavior='fillParent'
                    >
                        <View style={styles.modalContainer}>
                            {activeTaskIndex !== null && (
                                <View style={styles.modalContainer}>
                                    {activeTaskIndex !== null && (
                                        <View style={{ justifyContent: "center" }}>
                                            <TextInput
                                                mode="outlined"
                                                outlineStyle={styles.input}
                                                style={{ flex: 1 }}
                                                onChangeText={handleTaskNameChange}
                                                value={taskName}
                                                label="タスク名"
                                                activeOutlineColor='#764bda'
                                            />
                                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                {dayOfWeek.map((day) => (
                                                    <TouchableOpacity
                                                        key={day}
                                                        activeOpacity={0.8}
                                                        style={[
                                                            styles.dayButton,
                                                            livingTasks[activeTaskIndex].days.includes(day) && styles.selectedDayButton
                                                        ]}
                                                        onPress={() => toggleDaySelection(day)}
                                                    >
                                                        <Text style={[
                                                            styles.dayButtonText,
                                                            livingTasks[activeTaskIndex].days.includes(day) && styles.selectedDayButtonText
                                                        ]}>
                                                            {day}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                            <TextInput
                                                mode="outlined"
                                                outlineStyle={styles.input}
                                                style={{ height: 48, }}
                                                onChangeText={(text) => handleTimeRequiredChange(Number(text))}
                                                value={timeRequired.toString()}
                                                keyboardType="numeric"
                                                label="所要時間（分）"
                                                activeOutlineColor='#764bda'
                                            />
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 48,
    },
    content: {
        flexDirection: "row",
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
        // flexDirection: 'row',
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
    dayButton: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedDayButton: {
        backgroundColor: '#764bda',
        borderColor: '#764bda',
        color: '#ffffff',
    },
    dayButtonText: {
        color: '#000',
    },
    selectedDayButtonText: {
        color: '#fff',
    },
});