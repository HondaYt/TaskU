import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const TimerContext = createContext<TimerContextType>({
    time: 0,
    width: 0,
    setIsTimerZero: () => { },
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

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                const timeLeft = calculateTimeLeft(startTime, endTime);
                setTime(timeLeft);
                setWidth((timeLeft / ((endTime.getTime() - startTime.getTime()) / 1000)) * 100);
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    setIsTimerZero(true);
                }
            }, 1000);
            return () => clearInterval(interval);
        }, now < startTime ? startTime.getTime() - now.getTime() : 0);

        return () => clearTimeout(timeout);
    }, [startHour, startMinute, endHour, endMinute]);

    return (
        <TimerContext.Provider value={{
            time, width, setIsTimerZero,
            startHour, startMinute, endHour, endMinute,
            setStartHour, setStartMinute, setEndHour, setEndMinute
        }}>
            {children}
        </TimerContext.Provider>
    );
};