import React, { useId, useState, useEffect, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from 'utils/supabase'
import { Buffer } from 'buffer';
import { decode as atob } from 'base-64';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';

import { useFocusEffect } from '@react-navigation/native';

import {
    ScrollView,
    Animated,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';

import { useUserInfo } from 'components/UserInfoContext';
import { useTasks } from 'components/TaskContext';

interface RegisterInput1Props {
    setIsButtonDisabled: (disabled: boolean) => void;
    userInfo: any;
    setUserInfo: (userInfo: any) => void;
}
export default function registerInput1() {
    const { tasks, setTasks, fetchTasks } = useTasks();
    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const { userInfo, setUserInfo } = useUserInfo();
    const [userName, setUserName] = useState(userInfo?.username);
    const [userImage, setUserImage] = useState<string>(userInfo?.avatar_url ? `${userInfo.avatar_url}?timestamp=${new Date().getTime()}` : '');
    const userId = userInfo?.id;

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Resize the image
            const manipResult = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 500, height: 500 } }],
                { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
            );
            setUserImage(manipResult.uri);
        }
    };

    const updateUserInfo = async () => {
        if (userImage !== undefined) {
            // Determine the file extension
            const fileExtension = userImage.split('.').pop();
            const contentType = `image/${fileExtension}`;

            // 1. Read the local image file
            const asset = Asset.fromURI(userImage);
            await asset.downloadAsync();
            let base64Data = await FileSystem.readAsStringAsync(asset.localUri!, { encoding: FileSystem.EncodingType.Base64 });

            const binaryData = Buffer.from(base64Data, 'base64');

            // Remove the data URI scheme if present
            const base64Prefix = 'data:image/${fileExtension};base64,';
            if (base64Data.startsWith(base64Prefix)) {
                base64Data = base64Data.substring(base64Prefix.length);
            }

            // 2. Upload the image to Supabase storage
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('avatars')
                .upload(`${userId}.${fileExtension}`, binaryData, { contentType, upsert: true });

            if (uploadError) {
                console.log("userId:", userId);
                console.error('Error uploading image:', uploadError);
                return;
            }

            // 3. Get the URL of the uploaded file
            const { data: urlData } = await supabase
                .storage
                .from('avatars')
                .getPublicUrl(`${userId}.${fileExtension}`);


            const now = new Date();
            const { data, error } = await supabase
                .from('profiles')
                .update({ username: userName, avatar_url: urlData.publicUrl, updated_at: now })
                .eq('id', userId);

            if (error) {
                console.error('Error updating user info:', error);
            } else {
                console.log('User info updated:', data);
            }

            const { data: updatedUserInfo, error: fetchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (fetchError) {
                console.log("userId:", userId);
                console.error('Error fetching updated user info:', fetchError);
                return;
            }

            // ローカルの状態を更新
            setUserInfo(updatedUserInfo);
        }
    };

    return (
        <>
            <View style={styles.content}>
                <TextInput
                    value={userName}
                    onChangeText={setUserName}
                />
                <TouchableOpacity onPress={pickImage}>
                    <Image source={{ uri: userImage }} style={styles.userImage} />
                </TouchableOpacity>
                <Button title="Update Info" onPress={updateUserInfo} />
            </View>
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
    },
    userImage: {
        width: 100, // 画像の幅
        height: 100, // 画像の高さ
        borderRadius: 50, // 画像を円形にする
        backgroundColor: '#ccc',
    },
});