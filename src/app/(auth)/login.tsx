import { useUserStore } from '@/entities/user/model/userStore';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function LoginScreen() {
    const { me } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (me) {
            router.replace('/');
        }
    }, [me]);

    return (
        <View style={styles.container}>
            <LoginForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
