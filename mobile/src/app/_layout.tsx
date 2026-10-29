import { Stack } from 'expo-router';
import { DemoSessionProvider } from '@/components/demo-session';

export default function RootLayout() {
  return (
    <DemoSessionProvider><Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F172A' },
      }}
    /></DemoSessionProvider>
  );
}
