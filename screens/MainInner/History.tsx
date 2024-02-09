import React, { useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useUserTimezoneDateFormatter } from 'components/UserTimezoneDateContext';
import { useTasks } from 'components/TaskContext';
import { View } from 'react-native';
import Task from 'components/Task';

export default function Tasks() {


    const { tasks, setTasks, fetchTasks } = useTasks();



    const renderItemSeparator = () => {
        return <View style={{ height: 16 }} />;
    };
    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const sortedTasks = useMemo(() => {
        if (!tasks) return []; // tasks が null の場合は空の配列を返す

        return [...tasks]
            .filter(task => task.status === 'completed')
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [tasks]);

    return (
        <View style={styles.content}>
            <FlatList
                data={sortedTasks}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <Task
                        task={item}
                        genre={item.genre}
                        title={item.title}
                        priority={item.priority}
                        deadline={new Date(item.deadline)}
                        time_required={item.time_required}
                    />
                )}
                ItemSeparatorComponent={renderItemSeparator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 90,
        backgroundColor: "#fff",
    },
});
