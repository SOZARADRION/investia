import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function useInvestiaColors() {
  return useColorScheme() === 'dark'
    ? { background: '#0F172A', card: '#1E293B', text: '#F8FAFC', muted: '#CBD5E1', accent: '#34D399', border: '#64748B' }
    : { background: '#F1F5F9', card: '#FFFFFF', text: '#0F172A', muted: '#475569', accent: '#047857', border: '#64748B' };
}
export function Screen({ title, children }: PropsWithChildren<{ title: string }>) {
  const c = useInvestiaColors();
  return <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: c.background }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
        <Text style={{ color: c.accent, fontSize: 16, fontWeight: '700' }}>InvestIA · Demonstração</Text>
        <Text accessibilityRole="header" style={{ color: c.text, fontSize: 30, lineHeight: 38, fontWeight: '700' }}>{title}</Text>
        {children}
        <Body>Conteúdo educativo. Não constitui recomendação de investimento.</Body>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
export function Body({ children }: PropsWithChildren) {
  const c = useInvestiaColors();
  return <Text style={{ color: c.muted, fontSize: 16, lineHeight: 24 }}>{children}</Text>;
}
export function Card({ title, children }: PropsWithChildren<{ title: string }>) {
  const c = useInvestiaColors();
  return <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
    <Text accessibilityRole="header" style={{ color: c.text, fontSize: 20, fontWeight: '700' }}>{title}</Text>{children}
  </View>;
}
export function Button({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [styles.button, { opacity: disabled ? 0.45 : pressed ? 0.7 : 1 }]}>
    <Text style={{ color: '#0F172A', fontSize: 16, fontWeight: '700' }}>{label}</Text>
  </Pressable>;
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const c = useInvestiaColors();
  return <View style={{ gap: 8 }}><Text style={{ color: c.text, fontSize: 16 }}>{label}</Text>
    <TextInput {...props} accessibilityLabel={label} placeholderTextColor={c.muted}
      style={[styles.input, { color: c.text, borderColor: c.border, backgroundColor: c.card }, props.style]} />
  </View>;
}
const styles = StyleSheet.create({
  page: { padding: 24, gap: 24, flexGrow: 1, width: '100%', maxWidth: 680, alignSelf: 'center' },
  card: { padding: 20, gap: 16, borderRadius: 16, borderWidth: 1 },
  button: { minHeight: 48, padding: 16, backgroundColor: '#34D399', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 16, minHeight: 52 },
});
