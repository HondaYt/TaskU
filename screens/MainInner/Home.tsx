import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { supabase } from 'utils/supabase'



import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    SectionList
} from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { useUserInfo } from 'components/UserInfoContext';

import Welcome from 'screens/Welcome'
import Register from 'screens/Register'
import Timer from 'components/Timer'
import Btn from 'components/Btn'
import CurrentTask from 'components/CurrentTask'
import NextTask from 'components/NextTask'

import { useTasks } from 'components/TaskContext';


import CompletedToday from 'components/CompletedToday'

export default function Home() {

    const { tasks, fetchTasks } = useTasks();

    const renderItemSeparator = () => {
        return <View style={{ height: 16 }} />;
    };
    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const { userInfo, getAvatarUrl } = useUserInfo();
    const avatarUrl = getAvatarUrl();
    const priorityToNumber = (priority: string) => {
        if (priority === 'high') return 1;
        if (priority === 'medium') return 2;
        if (priority === 'low') return 3;
        return 4; // 不明な優先度は最後に
    };

    const currentDate = new Date();
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const sortedTasks = useMemo(() => {
        if (!tasks) return []; // tasks が null の場合は空の配列を返す
        return [...tasks]
            .filter(task => task.status !== 'pending' && task.status !== 'completed')
            .sort((a, b) => {
                const deadlineDiff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                if (deadlineDiff !== 0) return deadlineDiff;
                return priorityToNumber(a.priority) - priorityToNumber(b.priority);
            });
    }, [tasks]);

    const getGreeting = () => {
        const hour = new Date().getHours(); // 現在の時間（時）を取得
        if (hour < 12) {
            return 'おはようございます';
        } else if (hour < 17) {
            return 'おつかれさまです';
        } else {
            return 'こんばんは';
        }
    };

    const greeting = getGreeting(); // 挨拶のテキストを取得

    const renderHeader = () => (
        <View>
            <View style={styles.homeHeader}>
                <View style={styles.headerTextWrap}>
                    <Text style={styles.headerText}>{greeting}</Text>
                    <Text style={styles.headerText}>今日は<Text style={styles.date}>{currentDate.getFullYear()}.{currentDate.getMonth() + 1}.{currentDate.getDate()} {daysOfWeek[currentDate.getDay()]}曜日</Text></Text>
                </View>
                <View style={styles.userAvatar}>
                    <Image
                        source={{ uri: avatarUrl }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            <Text style={styles.sectionTtl}>今日の残り時間</Text>
            <Timer />
            {sortedTasks.length === 0 ? <CompletedToday /> :

                <>
                    <Text style={styles.sectionTtl}>現在のタスク</Text>
                    <FlatList
                        contentContainerStyle={styles.container}
                        data={sortedTasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {

                            if (index === 0) {
                                return (
                                    <CurrentTask
                                        task={item}
                                        genre={item.genre}
                                        title={item.title}
                                        priority={item.priority}
                                        deadline={new Date(item.deadline)}
                                        time_required={item.time_required}
                                    />
                                )
                            }

                            return null;
                        }}
                    />
                    <Text style={styles.sectionTtl}>今日のタスク</Text>
                </>
            }
        </View>
    );

    return (
        <View style={styles.content}>

            <FlatList
                contentContainerStyle={styles.container}
                data={sortedTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {

                    if (index === 0) {
                        return null;
                    }

                    return (
                        <NextTask
                            task={item}
                            genre={item.genre}
                            title={item.title}
                            priority={item.priority}
                            deadline={new Date(item.deadline)}
                            time_required={item.time_required}
                        />
                    );
                }}
                ItemSeparatorComponent={renderItemSeparator}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
}
const styles = StyleSheet.create({

    userAvatar: {
        width: 48,
        overflow: 'hidden',
        height: 48,
        borderRadius: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',

    },
    content: {
        flex: 1,
        // flexDirection: "row",
        // flexWrap: "wrap",
        backgroundColor: "#fff",
    },
    container: {
        padding: 16,
        paddingBottom: 90,

    },
    homeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 16,
    },
    headerTextWrap: {
        gap: 4,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTtl: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
        // color: '#555',
    },
    currentTask: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#ccc',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 0
        },
    },

    taskGenre: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskTtl: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    TaskDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    DetailTtl: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginRight: 4,
    },
    taskImportanceWrap: {
        width: 20,
        height: 20,
        backgroundColor: '#f74848',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskImportance: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    taskDeadline: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 8,
    },

});
