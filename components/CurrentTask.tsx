import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity
} from 'react-native';
import { Octicons } from '@expo/vector-icons';


import Welcome from 'screens/Welcome'
import Register from 'screens/Register'
import Timer from 'components/Timer'
import Btn from 'components/Btn'

const Stack = createNativeStackNavigator();

type CurrentTaskProps = {
    taskGenre: string;
    taskTtl: string;
    taskImportance: string;
    taskDeadline: string;
};
export default function CurrentTask(props: CurrentTaskProps) {
    const { taskImportance } = props;

    // 重要度によって色を変える
    let importanceColor;
    if (taskImportance === '高') {
        importanceColor = '#dc3333'; // 赤色
    } else if (taskImportance === '中') {
        importanceColor = '#b17b15'; // オレンジ色
    } else if (taskImportance === '低') {
        importanceColor = '#22bb22'; // 緑色
    } else {
        importanceColor = '#888'; // デフォルト色
    }

    return (
        <View style={styles.currentTask}>
            <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.taskGenre}>{props.taskGenre}</Text>
                    <Text style={styles.taskTtl}>{props.taskTtl}</Text>
                </View>
                <View>
                    <View style={[styles.TaskDetail]}>
                        <Text style={styles.DetailTtl}>重要度:</Text>
                        <View style={[styles.taskImportanceWrap, { backgroundColor: importanceColor }]}>
                            <Text style={styles.taskImportance}>{props.taskImportance}</Text>
                        </View>
                    </View>
                    <View style={styles.TaskDetail}><Text style={styles.DetailTtl}>期限:</Text><Text style={styles.taskDeadline}>{props.taskDeadline}</Text></View>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <Btn title="完了" style={{ flex: 1, backgroundColor: '#764bda' }} onPress={() => { }} />
                <Btn title="後に回す" style={{ width: 100, backgroundColor: '#888' }} onPress={() => { }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
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
        color: '#555',
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
