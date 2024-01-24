import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PropsWithChildren } from 'react';
import { PieChart, ProgressCircle } from 'react-native-svg-charts';
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
import { FAB } from 'react-native-paper';

import Welcome from 'screens/Welcome'
import Register from 'screens/Register'
import Timer from 'components/Timer'
import Btn from 'components/Btn'
import CurrentTask from 'components/CurrentTask'
import NextTask from 'components/NextTask'

const Stack = createNativeStackNavigator();

export default function Top() {

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.homeHeader}>
                    <View style={styles.headerTextWrap}>
                        <Text style={styles.headerText}>おはようございます</Text>
                        <Text style={styles.headerText}>今日は<Text style={styles.date}>2023.9.27 Wed</Text></Text>
                    </View>
                    <View style={styles.userIcon}>
                        <Octicons name="person" size={30} color="#fff" />
                    </View>
                </View>
                <Text style={styles.sectionTtl}>今日の残り時間</Text>
                <Timer />
                <Text style={styles.sectionTtl}>現在のタスク</Text>
                <CurrentTask taskGenre='HTML' taskTtl='Work06' taskDeadline='2023.9.27' taskImportance='高' />
                <Text style={styles.sectionTtl}>次のタスク</Text>
                <View style={{ gap: 16 }}>
                    <NextTask
                        taskGenre='PhotoShop'
                        taskTtl='キャラクター紹介'
                        taskDeadline='2023.10.06'
                        taskImportance='中'
                    />
                    <NextTask
                        taskGenre='Illustrator'
                        taskTtl='カレンダー'
                        taskDeadline='2023.10.02'
                        taskImportance='低'
                    />
                    <NextTask
                        taskGenre='家事'
                        taskTtl='洗濯する'
                        taskDeadline='2023.10.27'
                        taskImportance='中'
                    />
                    <NextTask
                        taskGenre='家事'
                        taskTtl='洗濯する'
                        taskDeadline='2023.10.27'
                        taskImportance='中'
                    />
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                color="#fff"
                onPress={() => console.log('Pressed')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    userIcon: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: '#61c2d5',
        justifyContent: 'center',
        alignItems: 'center',

    },
    content: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        backgroundColor: "#fff",
        padding: 16,
        paddingBottom: 90,
        // flexGrow: 1,
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
    fab: {
        backgroundColor: '#764bda',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
