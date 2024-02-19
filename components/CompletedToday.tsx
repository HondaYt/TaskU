import React from 'react';
import { View, Text } from 'react-native';
import FreeTimeImg from 'assets/FreeTime.svg'



export default function CompletedToday() {
    return (
        <View style={{ height: 430, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <FreeTimeImg height={200} width={200} />
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', lineHeight: 28, }}>今日予定されていた{"\n"}タスクは完了しました！</Text>
        </View>
    )
}