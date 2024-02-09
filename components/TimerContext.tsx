import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const TimerContext = createContext<TimerContextType>({
    time: 0,
    width: 0,
    setIsTimerZero: () => { },
    isTimerZero: false,
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
    setStartHour: () => { },
    setStartMinute: () => { },
    setEndHour: () => { },
    setEndMinute: () => { },
});

interface TimerContextType {
    time: number;
    width: number;
    setIsTimerZero: (isZero: boolean) => void;
    isTimerZero: boolean;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    setStartHour: (hour: number) => void;
    setStartMinute: (minute: number) => void;
    setEndHour: (hour: number) => void;
    setEndMinute: (minute: number) => void;
}

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimerContext must be used within a TimerProvider');
    }
    return context;
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
    const [isTimerZero, setIsTimerZero] = useState(false);
    const [time, setTime] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [startHour, setStartHour] = useState<number>(0);
    const [startMinute, setStartMinute] = useState<number>(0);
    const [endHour, setEndHour] = useState<number>(0);
    const [endMinute, setEndMinute] = useState<number>(0);


    useEffect(() => {
        setIsTimerZero(false);
        let intervalId: any = null;
        let timeoutId: any = null;

        const calculateTimeLeft = (start: Date, end: Date) => {
            const now = new Date();
            if (now > end) {
                return 0;
            } else if (now < start) {
                return (start.getTime() - now.getTime()) / 1000;
            } else {
                return (end.getTime() - now.getTime()) / 1000;
            }
        };

        const now = new Date();
        const startTime = new Date(now);
        startTime.setHours(startHour, startMinute, 0, 0);
        const endTime = new Date(now);
        endTime.setHours(endHour, endMinute, 0, 0);

        const initialTime = now < startTime ? (endTime.getTime() - startTime.getTime()) / 1000 : calculateTimeLeft(startTime, endTime);
        setTime(initialTime);
        setWidth((initialTime / ((endTime.getTime() - startTime.getTime()) / 1000)) * 100);

        // setTimeoutを使用して、startTimeまで待機する
        timeoutId = setTimeout(() => {
            // setIntervalを使用して、定期的に時間を更新する
            intervalId = setInterval(() => {
                const timeLeft = calculateTimeLeft(startTime, endTime);
                setTime(timeLeft);
                setWidth((timeLeft / ((endTime.getTime() - startTime.getTime()) / 1000)) * 100);
                if (timeLeft <= 0) {
                    clearInterval(intervalId);
                    setIsTimerZero(true);
                }
            }, 1000);
        }, now < startTime ? startTime.getTime() - now.getTime() : 0);

        // コンポーネントのアンマウント時、または依存配列の値が変更された際にタイマーをクリアする
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };
    }, [startHour, startMinute, endHour, endMinute]);

    return (
        <TimerContext.Provider value={{
            time, width, setIsTimerZero, isTimerZero,
            startHour, startMinute, endHour, endMinute,
            setStartHour, setStartMinute, setEndHour, setEndMinute
        }}>
            {children}
        </TimerContext.Provider>
    );
};