import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, TextInput, Button } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { useTasks } from 'components/TaskProvider';

const AddTaskFAB = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isViewVisible, setIsViewVisible] = useState(false);
    // useRefを使用してAnimated.Valueを初期化
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(0)).current;

    const [isExpanded, setIsExpanded] = useState(false);

    const { addTask } = useTasks(); // useTasksフックを使用してタスク関連の機能を取得
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [time_required, setTimeRequired] = useState('');


    const handleAddTask = async () => {
        if (title.trim() !== '') {
            const deadlineDate = new Date(deadline);
            await addTask(title, genre, deadlineDate, status, priority, parseInt(time_required, 10));
            setTitle(''); // タイトルをリセット
        } else {
            alert('タイトルを入力してください');
        }
    };

    useEffect(() => {
        // isOpenが変更されたときにアニメーションをトリガー
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: isOpen ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(rotateAnim, {
                toValue: isOpen ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isOpen]); // isOpenが変更されるたびに実行

    const toggleFAB = () => {
        setIsOpen(!isOpen);
        setIsViewVisible(!isViewVisible);
        setIsExpanded(!isExpanded); // 状態を更新してコンテナのサイズを切り替える

    };

    const labelWidth = widthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
    });
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'],
    });


    return (
        <TouchableOpacity activeOpacity={1} onPress={toggleFAB} style={[styles.container, isExpanded ? styles.expandedContainer : null]}>
            {isViewVisible && (
                <View style={styles.modal}>
                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTitle}
                            value={title}
                            placeholder="タスクを入力"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setGenre}
                            value={genre}
                            placeholder="ジャンル"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setDeadline}
                            value={deadline}
                            placeholder="締め切り"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setStatus}
                            value={status}
                            placeholder="ステータス"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPriority}
                            value={priority}
                            placeholder="優先度"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setTimeRequired}
                            value={time_required}
                            placeholder="必要時間"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            )}
            <View style={styles.fabWrap}>
                <TouchableOpacity activeOpacity={0.8} onPress={toggleFAB} style={styles.fab}>
                    <Animated.View style={[styles.fabIcon, {
                        transform: [
                            { rotate },
                        ]
                    }]}>
                        <Octicons name="plus" size={24} style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center', textAlign: "center", lineHeight: 56 }} color="white" />
                    </Animated.View>
                    <Animated.View style={[styles.labelContainer, { width: labelWidth }]}>
                        <Text style={styles.label}>タスクを追加</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    modal: {
        width: 340,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        borderRadius: 100,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        right: 16,
        bottom: 80 + 16,
        backgroundColor: '#00000080',
    },
    expandedContainer: {
        borderRadius: 0,
        padding: 16,
        height: '100%',
        width: '100%',
        right: 0,
        bottom: 80,
    },
    fabWrap: {

        backgroundColor: '#fff',
        borderRadius: 28,
        overflow: 'hidden',
    },
    fab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6200ee',
    },
    fabIcon: {
        // backgroundColor: '#764bda',
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelContainer: {
        overflow: 'hidden',
    },
    label: {

        justifyContent: 'center',
        color: 'white',
        width: 100,
    },
});

export default AddTaskFAB;