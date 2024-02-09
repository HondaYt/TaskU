import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Button, Platform, Keyboard, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useTasks } from 'components/TaskContext';
import Btn from 'components/Btn';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { getLocales } from 'expo-localization';

const locales = getLocales();
const languageTag = locales[0].languageTag;


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

    useEffect(() => {
        const newItemsForGenre = genres.map(genre => ({ label: genre, value: genre }));
        setItemsForGenre(newItemsForGenre);
    }, [genres]);

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

    const [modalHeight, setModalHeight] = useState(); // モーダルの高さの状態を追加

    useEffect(() => {
        // const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        //     setModalHeight(350); // キーボード表示時にモーダルの高さを60に設定
        // });
        // const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        //     setModalHeight(380); // キーボード非表示時にモーダルの高さを元に戻す
        // });

        //     return () => {
        //         keyboardDidShowListener.remove();
        //         keyboardDidHideListener.remove();
        //     };
    }, []);


    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(itemsForGenre);

    useEffect(() => {
        if (!searchText) {
            setFilteredData(itemsForGenre);
        } else {
            const filtered = itemsForGenre.filter(item =>
                item.label.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchText]);

    const handleAddGenre = () => {
        const newGenre = { label: searchText, value: searchText };
        setItemsForGenre(prevItems => [...prevItems, newGenre]);
        setGenre(searchText);
        setSearchText('');
    };

    return (
        <TouchableOpacity activeOpacity={1} onPress={toggleFAB} style={[styles.container, isOpen ? styles.expandedContainer : null]}>
            {isOpen && (
                <TouchableOpacity
                    style={[styles.modal, { height: modalHeight }]}
                    activeOpacity={1}
                    onPress={() => { }}
                >
                    <View style={{ gap: 8 }}>
                        <TextInput
                            label="タスク名"
                            value={title}
                            onChangeText={title => setTitle(title)}
                            contentStyle={{ backgroundColor: '#fff' }}

                        />
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={itemsForGenre}
                            search
                            labelField="label"
                            valueField="value"
                            placeholder="ジャンル"
                            searchPlaceholder="Search..."
                            value={genre}
                            maxHeight={280}
                            onChange={item => {
                                setGenre(item.value);
                            }}
                            renderLeftIcon={() => (
                                // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                                <Octicons name="duplicate" size={20} color="#333" style={{ marginHorizontal: 8 }} />
                            )}
                            renderInputSearch={(onSearch) => (
                                <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', gap: 8, padding: 8 }}>
                                    <TextInput
                                        style={{ flex: 1, height: 40 }}
                                        onChangeText={(text) => {
                                            setSearchText(text);
                                            onSearch(text);
                                        }}
                                        value={searchText}
                                        contentStyle={{ backgroundColor: '#fff' }}

                                    />
                                    <TouchableOpacity style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#888', borderRadius: 8 }} onPress={handleAddGenre}>
                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>追加</Text>
                                    </TouchableOpacity>
                                </View>

                            )}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text>期限</Text>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={deadline}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                    locale={languageTag}
                                />
                            </View>
                            <TextInput
                                onChangeText={setTimeRequired}
                                value={time_required}
                                label="所要時間"
                                keyboardType="numeric"
                                contentStyle={{ backgroundColor: '#fff' }}
                                style={{ flex: 1, }}
                            />
                        </View>
                        <Dropdown
                            style={styles.dropdown}

                            data={itemsForPriority}
                            labelField="label"
                            valueField="value"
                            placeholder="優先度を選択"
                            value={priority}
                            onChange={item => {
                                setPriority(item.value);
                            }}
                        />

                        <Button
                            onPress={handleAddTask}
                            title="タスクを追加"
                            color="#841584" />
                    </View>
                </TouchableOpacity>
            )
            }
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
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
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