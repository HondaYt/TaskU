import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';

import { supabase } from 'utils/supabase';
import { useUserInfo } from 'components/UserInfoProvider';
import { useUserTimezoneDateFormatter } from 'components/UserTimezoneDateProvider';
import { useTasks } from 'components/TaskProvider';

export default function Tasks() {
    const { formatAndSaveDate, formattedDates } = useUserTimezoneDateFormatter();

    const { tasks, addTask, deleteTask, fetchTasks } = useTasks(); // useTasksフックを使用してタスク関連の機能を取得

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks, addTask, deleteTask]);


    return (
        // <View style={styles.container}>
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            style={styles.container}
            renderItem={({ item }) => (
                <View style={styles.taskItem}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text>{`Created at: ${item.created_at instanceof Date ? item.created_at.toISOString() : item.created_at}`}</Text>
                    <Button
                        onPress={() => deleteTask(item.id)}
                        title="削除"
                        color="#ff0000"
                    />
                </View>
            )
            }
        />
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        backgroundColor: "#fff",
        gap: 16,
    },
    taskItem: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: "#f9c2ff",
    },
    taskTitle: {
        fontSize: 18,
    },
});
