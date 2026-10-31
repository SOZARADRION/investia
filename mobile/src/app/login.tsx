import { useState } from 'react';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { authErrorMessage } from '@/services/auth-errors';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    if (busy) return;
    if (!email.trim() || !password.trim()) {
      Alert.alert('Preencha os campos', 'Informe o e-mail e a senha.');
      return;
    }

    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword('');
      // A mudança de sessão libera as abas e remove as telas de acesso.
    } catch (error) {
      Alert.alert('Não foi possível entrar', authErrorMessage(error));
    } finally { setBusy(false); }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          <Text style={styles.title}>Entrar no InvestIA</Text>

          <Text style={styles.description}>
            Entre com uma conta criada neste projeto InvestIA.
          </Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            accessibilityLabel="E-mail"
            style={styles.input}
            placeholder="voce@exemplo.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            accessibilityLabel="Senha"
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            accessibilityRole="button"
            onPress={handleLogin}
            disabled={busy}
            accessibilityState={{ disabled: busy, busy }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{busy ? 'Entrando…' : 'Entrar'}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            disabled={busy}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#64748B',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
  },
  backText: {
    color: '#CBD5E1',
    fontSize: 16,
  },
});
