import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

import * as Localization from 'expo-localization';

interface UserInfo {
    avatar_url: string;
    id: string;
    updated_at: string;
    username: string;
}

// コンテキストの作成
const UserInfoContext = createContext<{
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
    updateUserInfo: (newData: Partial<UserInfo>) => void;
    getAvatarUrl: () => string | undefined;
}>({
    userInfo: null,
    setUserInfo: () => { },
    updateUserInfo: (newData: Partial<UserInfo>) => { },
    getAvatarUrl: () => undefined,
});

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    // userInfoを更新する関数
    const updateUserInfo = (newData: Partial<UserInfo>) => {
        setUserInfo(prevUserInfo => {
            // prevUserInfoがnullの場合にデフォルト値を提供
            const defaultUserInfo: UserInfo = {
                id: '',
                avatar_url: '',
                updated_at: '',
                username: '',
                ...prevUserInfo // prevUserInfoの値で上書き
            };
            return {
                ...defaultUserInfo,
                ...newData,
            };
        });
    };

    // アバターURLを取得する関数
    const getAvatarUrl = () => {
        if (!userInfo?.avatar_url) return undefined;
        return `${userInfo.avatar_url}?timestamp=${new Date().getTime()}`;
    };


    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo, updateUserInfo, getAvatarUrl }}>
            {children}
        </UserInfoContext.Provider>
    );
};

// コンテキストを使用するためのカスタムフック
export const useUserInfo = () => {
    const context = useContext(UserInfoContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};



