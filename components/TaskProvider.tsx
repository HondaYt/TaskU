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
    genres: string[];
    fetchGenres: () => void;
    updateTaskStatus: (taskId: string, newStatus: string) => Promise<void>;
}>({
    tasks: null,
    setTasks: () => { },
    fetchTasks: () => { },
    addTask: async (
    ) => { },
    deleteTask: async () => { },
    genres: [],
    fetchGenres: () => { },
    updateTaskStatus: async () => { },
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
    const { userInfo } = useUserInfo();
    const [tasks, setTasks] = useState<Task[]>([]);
    const { formatAndSaveDate } = useUserTimezoneDateFormatter();
    const userId = userInfo?.id;


    const fetchTasks = async () => {
        let { data: tasks } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', userId);
        if (tasks) {
            setTasks(tasks || []);
            tasks.forEach(task => {
                formatAndSaveDate(task.created_at);
            });
        }
        fetchGenres();
        console.log("fetchTasks");
    };

    const [genres, setGenres] = useState<string[]>([]);

    const fetchGenres = async () => {
        let { data: genresData, error } = await supabase
            .from('tasks') // 'genres' はジャンルを保存しているテーブル名
            .select('genre')
            .eq('user_id', userId);
        if (error) {
            console.error('ジャンルの取得中にエラーが発生しました:', error);
            return;
        }
        // ジャンルデータがnullでないことを確認し、ジャンルの状態を更新
        if (genresData) {
            setGenres(genresData.map(g => g.genre).filter((x, i, self) => self.indexOf(x) === i));
        }
    };

    const addTask = async (title: string, genre: string, deadline: Date, status: string, priority: string, time_required: number) => {
        const { error } = await supabase
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
        if (error) {
            console.error('タスクの追加中にエラーが発生しました:', error);
        }
        fetchTasks();
    };

    const deleteTask = async (taskId: number) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .match({ id: taskId });

        if (error) {
            console.error('error', error);
        }
        fetchTasks();
    };

    async function updateTaskStatus(taskId: string, newStatus: string) {
        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus, updated_at: new Date() })
            .eq('id', taskId);

        if (error) {
            console.error('タスクのステータス更新中にエラーが発生しました:', error);
        } else {
            fetchTasks(); // タスクリストを更新
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, setTasks, fetchTasks, addTask, deleteTask, genres, fetchGenres, updateTaskStatus }}>
            {children}
        </TaskContext.Provider>
    );
};
