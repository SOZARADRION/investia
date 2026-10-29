import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useInvestiaColors } from '@/components/investia-ui';
import { useDemoSession } from '@/components/demo-session';

export const unstable_settings = { anchor: 'painel' };

export default function TabLayout() {
  const c = useInvestiaColors();
  const { version } = useDemoSession();
  // Reinicia todas as telas ao sair, mesmo se o navegador preservar abas.
  return <Tabs key={version} backBehavior="initialRoute" screenOptions={{ headerShown: false,
    tabBarActiveTintColor: c.accent, tabBarInactiveTintColor: c.muted,
    tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border }, tabBarHideOnKeyboard: true,
  }}>
    <Tabs.Screen name="painel" options={{ title: 'Início', tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: 24 }}>⌂</Text> }} />
    <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: 24 }}>≋</Text> }} />
    <Tabs.Screen name="simulador" options={{ title: 'Simulador', tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: 24 }}>±</Text> }} />
    <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: 24 }}>○</Text> }} />
  </Tabs>;
}
