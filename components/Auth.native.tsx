import React from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from 'utils/supabase'

import { useUserInfo } from 'components/UserInfoProvider';

export default function Auth({ navigation }: any) {

    const { setUserInfo } = useUserInfo();

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'],
        iosClientId: '679833251993-p0scalicgumkfp665pgcmhol5cvsri0d.apps.googleusercontent.com',
    })

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
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
        />
    )
}