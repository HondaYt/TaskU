import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';

import { supabase } from 'utils/supabase';
import { useUserInfo } from 'components/UserInfoProvider';
import { useUserTimezoneDateFormatter } from 'components/UserTimezoneDateProvider';

interface Task {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

export default function Tasks() {
    const { userInfo, setUserInfo } = useUserInfo();
    const { formatAndSaveDate, formattedDates } = useUserTimezoneDateFormatter();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const userId = userInfo?.id;

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        let { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', userId);
        if (tasks) {
            setTasks(tasks || []);
            tasks.forEach(task => {
                formatAndSaveDate(task.created_at);
            });
        }
    };

    const addTask = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([
                { title: title, user_id: userId, created_at: new Date() }
            ]);

        if (error) console.error('error', error);
        else {
            setTitle('');
            fetchTasks();
        }
    };
    const deleteTask = async (taskId: number) => {
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .match({ id: taskId });

        if (error) {
            console.error('error', error);
        } else {
            fetchTasks();
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="タスクを入力"
            />
            <Button
                onPress={addTask}
                title="タスクを追加"
                color="#841584"
            />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                        <Text>{`Created at: ${formattedDates[item.created_at] || item.created_at}`}</Text>
                        <Button
                            onPress={() => deleteTask(item.id)}
                            title="削除"
                            color="#ff0000"
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
