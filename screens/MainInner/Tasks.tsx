import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import { supabase } from 'utils/supabase'
import { useUserInfo } from 'components/UserInfoProvider';


export default function Tasks() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [input, setInput] = useState('');


    const { userInfo } = useUserInfo();
    const userId = userInfo?.user?.id;


    const handleAddTask = async () => {
        const newTask = input.trim();
        if (newTask) {
            // ローカルの状態を更新
            setTasks([...tasks, newTask]);
            setInput('');

            try {
                const { data, error } = await supabase
                    .from('tasks')
                    .insert([
                        { title: newTask, user_id: userId, created_at: new Date() }
                    ]);
                if (error) throw error;
                console.log('Task added:', data);
                console.log(userId);

            } catch (error) {
                console.error('Error uploading task:', error);
            }
        }
    };

    const handleDeleteTask = (index: number) => {
        setTasks(tasks.filter((task, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="新しいタスクを入力"
            />
            <Button title="タスクを追加" onPress={handleAddTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.task}>
                        <Text>{item}</Text>
                        <Button title="削除" onPress={() => handleDeleteTask(index)} />
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
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});
