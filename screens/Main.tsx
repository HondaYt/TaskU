import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { SvgUri, SvgXml } from 'react-native-svg';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
const Stack = createNativeStackNavigator();
import Home from 'screens/MainInner/Home'
import Tasks from 'screens/MainInner/Tasks'
import History from 'screens/MainInner/History'
import { Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useTasks } from 'components/TaskContext';
import { useTimer } from 'components/TimerContext';
import AddTaskFAB from 'components/AddTaskFAB'
import BedtimeImg from 'img/BedTime.svg'



export default function Main() {
    const { isTimerZero, setIsTimerZero } = useTimer();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const { tasks, fetchTasks, addTask } = useTasks();
    const [title, setTitle] = useState('');

    const [genre, setGenre] = useState('');
    const [status, setStatus] = useState('');
    const [time_required, setTimeRequired] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [priority, setPriority] = useState('medium');

    useEffect(() => {
        const addSentakuTaskIfNotExists = async () => {
            const defaultTitle = '洗濯';
            const defaultGenre = '家事';
            const defaultDeadline = new Date();
            const defaultStatus = '';
            const defaultPriority = 'high';
            const defaultTimeRequired = 60;

            const taskExists = tasks?.some(task => task.title === defaultTitle && task.status === defaultStatus);

            if (!taskExists) {
                await addTask(defaultTitle, defaultGenre, defaultDeadline, defaultStatus, defaultPriority, defaultTimeRequired);
            }
        };
        const addSouziTaskIfNotExists = async () => {
            const defaultTitle = '掃除';
            const defaultGenre = '家事';
            const defaultDeadline = new Date();
            const defaultStatus = '';
            const defaultPriority = 'high';
            const defaultTimeRequired = 60;

            const taskExists = tasks?.some(task => task.title === defaultTitle && task.status === defaultStatus);

            if (!taskExists) {
                await addTask(defaultTitle, defaultGenre, defaultDeadline, defaultStatus, defaultPriority, defaultTimeRequired);
            }
        };

        addSentakuTaskIfNotExists();
        addSouziTaskIfNotExists();
    }, []);


    // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (isTimerZero) {
            bottomSheetModalRef.current?.present();
        }
    }, [isTimerZero]);

    const renderBackdrop = useCallback(
        (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['right', 'top', 'left']}>
                    <Tab.Navigator
                        screenOptions={{ headerShown: false, tabBarActiveTintColor: '#44c951', }}
                    >
                        <Tab.Screen
                            name="Home"
                            component={Home}
                            // children={() => <Home />}
                            // iconを追加
                            options={{
                                tabBarLabel: 'ホーム', tabBarIcon: ({ color }) => (
                                    <Octicons name="home" size={24} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Tasks"
                            children={() => <Tasks />}
                            options={{
                                tabBarLabel: 'タスク', tabBarIcon: ({ color }) => (
                                    <Octicons name="paste" size={24} color={color} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="History"
                            component={History}
                            options={{
                                tabBarLabel: '履歴', tabBarIcon: ({ color }) => (
                                    <Octicons name="history" size={24} color={color} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                </SafeAreaView>
                <AddTaskFAB />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={['32%']}
                    backdropComponent={renderBackdrop}
                    style={{ alignItems: 'center', justifyContent: 'center', }}
                >
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>就寝時間になりました。</Text>
                        <BedtimeImg width={200} height={200} />
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    fab: {
        backgroundColor: '#764bda',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
    },
});