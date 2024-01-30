import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// コンテキストの作成
const UserInfoContext = createContext<{
    userInfo: any;
    setUserInfo: (userInfo: any) => void;
}>({
    userInfo: null,
    setUserInfo: () => { },
});

// プロバイダーコンポーネントの作成
export const UserInfoProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        console.log('userInfoが更新されました:', userInfo);
    }, [userInfo]);


    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
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