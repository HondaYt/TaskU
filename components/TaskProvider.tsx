import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from 'utils/supabase';
import { useUserInfo } from 'components/UserInfoProvider';
import { useUserTimezoneDateFormatter } from 'components/UserTimezoneDateProvider';


// コンテキストの作成
const TaskContext = createContext<{
    tasks: Task[] | null;
    setTasks: (tasks: Task[]) => void;
    fetchTasks: () => void;
    addTask: (
        title: string,
        genre: string,
        deadline: Date,
        status: string,
        priority: string,
        time_required: number
    ) => Promise<void>;
    deleteTask: (taskId: number) => void;
}>({
    tasks: null,
    setTasks: () => { },
    fetchTasks: () => { },
    addTask: async (
        title: string,
        genre: string,
        deadline: Date,
        status: string,
        priority: string,
        time_required: number
    ) => { },
    deleteTask: async (taskId: number) => { },
});


interface Task {
    id: number;
    title: string;
    genre: string;
    deadline: Date;
    status: string;
    priority: string;
    time_required: number;
    created_at: Date;
    updated_at: Date;
}


export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const { userInfo, setUserInfo } = useUserInfo();
    const [tasks, setTasks] = useState<Task[]>([]);
    const { formatAndSaveDate, formattedDates } = useUserTimezoneDateFormatter();
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

    const addTask = async (title: string, genre: string, deadline: Date, status: string, priority: string, time_required: number) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{
                title: title,
                genre: genre,
                deadline: deadline,
                status: status,
                priority: priority,
                time_required: time_required,
                user_id: userId,
                created_at: new Date()
            }]);
        if (!error) {
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
        <TaskContext.Provider value={{ tasks, setTasks, fetchTasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};