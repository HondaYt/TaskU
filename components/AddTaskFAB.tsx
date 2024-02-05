import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Octicons } from '@expo/vector-icons';

import { useTasks } from 'components/TaskProvider';

const AddTaskFAB = () => {
    const [isOpen, setIsOpen] = useState(false);

    const rotateAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(0)).current;

    const { tasks, addTask, genres, fetchGenres } = useTasks();
    const [title, setTitle] = useState('');

    const [genre, setGenre] = useState('');
    const [status, setStatus] = useState('');
    const [time_required, setTimeRequired] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [priority, setPriority] = useState('medium');

    const [openGenre, setOpenGenre] = useState(false);
    const [openPriority, setOpenPriority] = useState(false);
    const [itemsForGenre, setItemsForGenre] = useState(genres.map(genre => ({ label: genre, value: genre })));
    const [itemsForPriority, setItemsForPriority] = useState([
        { label: '低', value: 'low' },
        { label: '中', value: 'medium' },
        { label: '高', value: 'high' }
    ]);

    const onChange = useCallback((event: any, selectedDate: any) => {
        const currentDate = selectedDate instanceof Date ? selectedDate : deadline;
        setShowDatePicker(Platform.OS === 'ios');
        setDeadline(currentDate);
    }, [deadline]);

    const handleAddTask = useCallback(async () => {
        if (title.trim() !== '') {

            const deadlineDate = new Date(deadline);
            await addTask(title, genre, deadlineDate, status, priority, parseInt(time_required, 10));
            setTitle('');
            setGenre('');
            setDeadline(new Date());
            setStatus('');
            setPriority('medium');
            setTimeRequired('');
            setIsOpen(false);

        } else {
            alert('タイトルを入力してください');
        }
    }, [title, genre, deadline, status, priority, time_required, addTask]);

    const toggleFAB = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    useEffect(() => {
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
    }, [isOpen]);

    const labelWidth = widthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
    });
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'],
    });

    return (
        <TouchableOpacity activeOpacity={1} onPress={toggleFAB} style={[styles.container, isOpen ? styles.expandedContainer : null]}>
            {isOpen && (
                <TouchableOpacity
                    style={styles.modal}
                    activeOpacity={1}
                    onPress={() => { }}
                >
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
                        <DropDownPicker
                            open={openGenre}
                            value={genre}
                            items={itemsForGenre}
                            setOpen={setOpenGenre}
                            setValue={setGenre}
                            setItems={setItemsForGenre}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                        <View>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={deadline}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        </View>
                        <DropDownPicker
                            open={openPriority}
                            value={priority}
                            items={itemsForPriority}
                            setOpen={setOpenPriority}
                            setValue={setPriority}
                            setItems={setItemsForPriority}
                            zIndex={2000}
                            zIndexInverse={1000}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setTimeRequired}
                            value={time_required}
                            placeholder="必要時間"
                            keyboardType="numeric"
                        />
                        <Button
                            onPress={handleAddTask}
                            title="タスクを追加"
                            color="#841584" />
                    </View>
                </TouchableOpacity>
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
        width: '100%',
        height: 40,
        // margin: 12,
        marginVertical: 8,
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