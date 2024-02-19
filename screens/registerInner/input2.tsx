import React from 'react';
import { useEffect, useState, useRef, ElementType, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import {
    ScrollView,
    Animated,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

import AttributeBtn from 'components/AttributeBtn'
import LivingAloneImg from 'assets/LivingAlone.svg'
import FamilyImg from 'assets/Family.svg'
import StudentImg from 'assets/Student.svg'
import WorkerImg from 'assets/Worker.svg'
import HousewifeImg from 'assets/Housewife.svg'

const { width } = Dimensions.get('window');
// ボタンの幅（または高さ）を計算
const buttonSize = width / 2 - 16 - 8; // 画面幅の半分から余白とマージンを引いた値

interface RegisterInput1Props {
    setIsButtonDisabled: (disabled: boolean) => void;
}

export default function registerInput1({ setIsButtonDisabled }: RegisterInput1Props) {
    const [selectedAttributes, setSelectedAttributes] = useState<{ [category: string]: string | undefined }>({});

    useEffect(() => {
        // 'living' 属性が選択されている場合のみボタンを有効にする
        setIsButtonDisabled(!selectedAttributes['living']);
    }, [selectedAttributes, setIsButtonDisabled]);

    // 属性とそのカテゴリのマッピング
    const attributes = {
        'living': ['一人暮らし', '同居中'],
        'status': selectedAttributes['living'] ? ['学生', '社会人', '主婦・主夫'] : [],
        // 他のカテゴリと属性を追加
    };
    const createIconComponent = (IconComponent: ElementType) => {
        return <IconComponent height={buttonSize / 1.6} width={buttonSize / 1} />;
    };

    const attributeIcons: { [key: string]: ReactNode } = {
        '一人暮らし': createIconComponent(LivingAloneImg),
        '同居中': createIconComponent(FamilyImg),
        '学生': createIconComponent(StudentImg),
        '社会人': createIconComponent(WorkerImg),
        '主婦・主夫': createIconComponent(HousewifeImg),
        // 他の属性に対するアイコンも同様に追加
    };

    const handleAttributePress = (category: string, attribute: string) => {
        setSelectedAttributes(prevSelectedAttributes => {
            const newAttributes = { ...prevSelectedAttributes };
            const isAlreadySelected = prevSelectedAttributes[category] === attribute;
            newAttributes[category] = isAlreadySelected ? undefined : attribute;

            // 'living' カテゴリの選択を解除した場合、'status' カテゴリもクリアする
            if (category === 'living' && isAlreadySelected) {
                newAttributes['status'] = undefined;
            }

            return newAttributes;
        });
    };



    const statusFadeAnim = useRef(new Animated.Value(0)).current; // 初期値は0（透明）

    useEffect(() => {
        // livingが選択されたらstatusカテゴリのフェードインアニメーションを開始
        if (selectedAttributes['living']) {
            Animated.timing(statusFadeAnim, {
                toValue: 1, // 最終的な透明度は1（不透明）
                duration: 250, // アニメーションの時間は500ミリ秒
                useNativeDriver: true, // ネイティブドライバーを使用
            }).start();
        } else {
            // livingが選択されていない場合は透明度を0に戻す
            statusFadeAnim.setValue(0);
        }
    }, [selectedAttributes['living'], statusFadeAnim]);

    // オプションテキストとボーダーのフェードインアニメーションスタイル
    const optionFadeStyle = { opacity: statusFadeAnim };
    return (
        <>
            <ScrollView contentContainerStyle={styles.content}>
                {Object.entries(attributes).map(([category, options], index) => {
                    // statusカテゴリの場合はstatusFadeAnimを使用
                    const fadeAnimationStyle = category === 'status' ? { opacity: statusFadeAnim } : {};

                    // カテゴリの属性ボタンをレンダリング
                    const categoryElements = (
                        <Animated.View
                            key={category}
                            style={[
                                styles.wrap,
                                fadeAnimationStyle,
                                { display: options.length > 0 ? 'flex' : 'none' }
                            ]}
                        >
                            {options.map((attribute) => (
                                <AttributeBtn
                                    key={attribute}
                                    title={attribute}
                                    icon={attributeIcons[attribute]}
                                    onPress={() => handleAttributePress(category, attribute)}
                                    selected={selectedAttributes[category] === attribute}
                                />
                            ))}
                        </Animated.View>
                    );

                    // livingカテゴリの後にオプションテキストとボーダーを挿入
                    if (category === 'living') {
                        return (
                            <React.Fragment key="livingFragment">
                                {categoryElements}
                                {selectedAttributes['living'] && (
                                    <Animated.View style={[optionFadeStyle, styles.option]}>
                                        <Text style={styles.optionText}>オプション</Text>
                                        <View style={styles.separator} />
                                    </Animated.View>
                                )}
                            </React.Fragment>
                        );
                    } else {
                        return categoryElements;
                    }
                })}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 16,
        backgroundColor: "#fff",
        padding: 16,
        // flexGrow: 1,
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        // flex: 1,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    attributeBtn: {
        backgroundColor: "#fff",
        borderColor: "#333",
        borderWidth: 3,
        width: buttonSize, // 正方形の幅
        height: buttonSize, // 正方形の高さ
        borderRadius: 16,
        justifyContent: 'center', // 子要素を中央に配置
        alignItems: 'center', // 子要素を中央に配置
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        // 他のスタイル属性
    },
    optionText: {
        paddingHorizontal: 8,
        textAlign: 'center', // テキストを中央揃えに
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888',
        // padding: 8, // オプションテキストの上下のパディング
    },
    separator: {
        flex: 1,
        height: 1,
        marginTop: 4, // オプションテキストとの間隔
        marginBottom: 4, // 次の要素との間隔
        backgroundColor: '#888',
    },
});