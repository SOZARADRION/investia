import { Stack } from 'expo-router';
import { DemoSessionProvider } from '@/components/demo-session';
import { AuthSessionProvider, useAuthSession } from '@/components/auth-session';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  return <AuthSessionProvider><DemoSessionProvider><Navigation /></DemoSessionProvider></AuthSessionProvider>;
}

function Navigation() {
  const { user, loading, creating } = useAuthSession();
  if (loading) return <View style={{ flex: 1, backgroundColor: '#0F172A', justifyContent: 'center' }}><ActivityIndicator accessibilityLabel="Restaurando sessão" color="#34D399" /></View>;
  const authenticated = !!user && !creating;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F172A' },
      }}
    >
      <Stack.Protected guard={!authenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
      </Stack.Protected>
      <Stack.Protected guard={authenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="inicio" />
        <Stack.Screen name="explore" />
      </Stack.Protected>
    </Stack>
  );
}
