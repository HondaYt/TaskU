import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from 'utils/supabase'

import { FontAwesome6 } from '@expo/vector-icons';

import { useUserInfo } from 'components/UserInfoContext';
import GoogleLogo from 'assets/googleLogo.svg';

export default function Auth({ navigation }: any) {

    const { setUserInfo } = useUserInfo();

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'],
        iosClientId: '679833251993-p0scalicgumkfp665pgcmhol5cvsri0d.apps.googleusercontent.com',
    })

    return (
        <TouchableOpacity
            style={styles.googleButton}
            activeOpacity={0.8}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices()
                    const userInfo = await GoogleSignin.signIn()
                    if (userInfo.idToken) {
                        const { data, error } = await supabase.auth.signInWithIdToken({
                            provider: 'google',
                            token: userInfo.idToken,
                        })
                        if (!error) {
                            userInfo.user.id = data.user.id;
                            const { data: updatedUserInfo, error: fetchError } = await supabase
                                .from('profiles')
                                .select('*')
                                .eq('id', userInfo.user.id)
                                .single();
                            if (fetchError) {
                                console.error('Error fetching updated user info:', fetchError);
                                return;
                            }
                            setUserInfo(updatedUserInfo);
                            navigation.navigate('Register')
                        }
                    } else {
                        throw new Error('no ID token present!')
                    }
                } catch (error: any) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                    } else {
                        // some other error happened
                    }
                }
            }}
        >
            <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}><GoogleLogo height={30} width={30} /></View>
            <View style={{ flex: 1, height: 60, justifyContent: 'center', alignItems: 'center', }}><Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>Googleでログイン</Text></View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    googleButton: {
        width: '100%',
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        elevation: 6,
    },
});
