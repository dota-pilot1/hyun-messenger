import { Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { Pressable } from 'react-native';

export default function TestScreen() {
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: '테스트 페이지' }} />

            <ThemedText type="title">테스트 페이지 추가 성공!</ThemedText>
            <ThemedText style={styles.description}>
                이 페이지는 app/test1.tsx 파일에 의해 생성되었습니다.
            </ThemedText>

            <Pressable onPress={() => router.back()} style={styles.button}>
                <ThemedText type="defaultSemiBold">뒤로 가기</ThemedText>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#007AFF',
        borderRadius: 8,
    },
});
