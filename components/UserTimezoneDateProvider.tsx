import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import * as Localization from 'expo-localization';

// コンテキストの作成
const UserTimezoneDateFormatterContext = createContext<{
    formatAndSaveDate: (dateString: string) => void;
    formattedDates: { [key: string]: string };
}>({
    formatAndSaveDate: () => { },
    formattedDates: {},
});

export const UserTimezoneDateProvider = ({ children }: { children: ReactNode }) => {
    const [formattedDates, setFormattedDates] = useState<{ [key: string]: string }>({});

    const formatAndSaveDate = async (dateString: string) => {
        if (!formattedDates[dateString]) {
            const formatted = await formatCreatedAt(dateString);
            setFormattedDates(prev => ({ ...prev, [dateString]: formatted }));
        }
    };
    let cachedTimezone: string | undefined = undefined;

    async function getUserTimezone(): Promise<string | undefined> {
        if (!cachedTimezone) {
            const calendars = await Localization.getCalendars();
            cachedTimezone = calendars[0]?.timeZone ?? undefined;
        }
        return cachedTimezone;
    }

    const formatCreatedAt = async (createdAt: string, includeTime: boolean = true) => {
        const userTimezone = await getUserTimezone();
        const date = new Date(createdAt);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: userTimezone,
        };
        if (includeTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
            // options.second = '2-digit'; // 秒を含める場合はこのコメントを解除
        }
        const formatter = new Intl.DateTimeFormat('default', options);
        return formatter.format(date);
    };


    return (
        <UserTimezoneDateFormatterContext.Provider value={{ formatAndSaveDate, formattedDates }}>
            {children}
        </UserTimezoneDateFormatterContext.Provider>
    );
};
export const useUserTimezoneDateFormatter = () => {
    const context = useContext(UserTimezoneDateFormatterContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};