import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ContextMenu from "react-native-context-menu-view";
import { useTasks } from 'components/TaskContext';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';


import { useUserTimezoneDateFormatter } from 'components/UserTimezoneDateContext';

type TaskProps = {
    genre: string;
    title: string;
    priority: string;
    deadline: Date;
    task: any;
    time_required: number;
};

export default function Task(props: TaskProps) {
    const { formatAndSaveDate, formattedDates } = useUserTimezoneDateFormatter();
    const { priority, deadline, task } = props; // Added deleteTask to props destructuring
    const { deleteTask, fetchTasks } = useTasks();
    useEffect(() => {
        if (deadline) { // deadline が undefined でないことを確認
            formatAndSaveDate(deadline.toISOString());
        }
    }, [deadline, formatAndSaveDate]);

    // 時間を除外して日付のみを表示する
    const formatDateWithoutTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP');
    };

    // formattedDates から取得する代わりに、直接 formatDateWithoutTime を使用
    const formattedDeadline = formatDateWithoutTime(deadline.toISOString());

    let priorityColor;
    let priorityText;

    if (priority === 'high') {
        priorityColor = '#dc3333'; // 赤色
        priorityText = '高';
    } else if (priority === 'medium') {
        priorityColor = '#b17b15'; // オレンジ色
        priorityText = '中';
    } else if (priority === 'low') {
        priorityColor = '#22bb22'; // 緑色
        priorityText = '低';
    } else {
        priorityColor = '#888'; // デフォルト色
        priorityText = '不明';
    }


    return (
        <ContextMenu
            actions={[{ title: "編集", systemIcon: "pencil" }, { title: "削除", systemIcon: "trash", destructive: true }]}
            onPress={(e) => {
                if (e.nativeEvent.name === "削除") {
                    deleteTask(task.id);
                }
            }}
        >
            <View style={styles.currentTask}>
                <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: 'space-between' }}>
                    <View style={{ gap: 4 }}>
                        <Text style={styles.genre}>{props.genre}</Text>
                        <Text style={styles.title}>{props.title}</Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <View style={styles.TaskDetail}>
                                <Text style={styles.DetailTtl}>優先度:</Text>
                                <View style={[styles.taskPriorityWrap, { backgroundColor: priorityColor }]}>
                                    <Text style={styles.taskPriority}>{priorityText}</Text>
                                </View>
                            </View>
                            <View style={styles.TaskDetail}><Text style={styles.DetailTtl}>所要時間:</Text><Text style={styles.taskDeadline}>{props.time_required}</Text><Text style={styles.DetailTtl}>分</Text></View>
                            <View style={styles.TaskDetail}><Text style={styles.DetailTtl}>期限:</Text><Text style={styles.taskDeadline}>{formattedDeadline}</Text></View>
                        </View>
                    </View>
                </View>
                {/* <Btn title="詳細" textStyle={{ fontSize: 18 }} style={{ width: 90, backgroundColor: '#888' }} onPress={() => { }} /> */}
            </View>
        </ContextMenu>
    );
}
const styles = StyleSheet.create({
    currentTask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    genre: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    title: {
        fontSize: 16,
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
    taskPriorityWrap: {
        width: 20,
        height: 20,
        backgroundColor: '#f74848',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskPriority: {
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
