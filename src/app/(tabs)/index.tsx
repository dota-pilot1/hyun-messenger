import { useUserStore } from '@/entities/user/model/userStore';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { HelloWave } from '@/shared/ui/hello-wave';
import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { Redirect } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { me, isInitialized } = useUserStore();
  const { logout, isLoggingOut } = useAuth();

  if (!isInitialized) return null;

  if (!me) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Messenger</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedText type="subtitle">안녕하세요, {me.name || me.email}님!</ThemedText>
        <ThemedText style={styles.placeholder}>
          채팅방 목록 및 메신저 기능이 곧 구현될 예정입니다.
        </ThemedText>
      </ThemedView>

      <Pressable
        onPress={() => logout()}
        style={({ pressed }) => [
          styles.logoutButton,
          { opacity: pressed || isLoggingOut ? 0.7 : 1 }
        ]}
        disabled={isLoggingOut}
      >
        <ThemedText style={styles.logoutText}>
          {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  placeholder: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  logoutButton: {
    marginBottom: 40,
    paddingVertical: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
