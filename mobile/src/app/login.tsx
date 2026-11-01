import { useState } from 'react';
import { router } from 'expo-router';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useCooldown } from '@/hooks/use-cooldown';
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
  const [resetting, setResetting] = useState(false);
  const { remaining, start } = useCooldown();

  async function resetPassword() {
    if (busy || resetting || remaining > 0) return;
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      Alert.alert('Informe seu e-mail', 'Preencha um e-mail válido no campo E-mail para recuperar a senha.');
      return;
    }
    setResetting(true);
    try {
      await sendPasswordResetEmail(auth, address);
      resetRequested();
    } catch (error) {
      if ((error as { code?: string }).code === 'auth/user-not-found') resetRequested();
      else Alert.alert('Não foi possível solicitar a recuperação', authErrorMessage(error));
    } finally { setResetting(false); }
  }

  function resetRequested() {
    start();
    Alert.alert('Solicitação recebida', 'Se houver uma conta para esse e-mail, você receberá um link para redefinir a senha. Confira também o spam. Depois, volte ao InvestIA e entre com a nova senha.');
  }

  async function handleLogin() {
    if (busy || resetting) return;
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
            disabled={busy || resetting}
            accessibilityState={{ disabled: busy || resetting, busy }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{busy ? 'Entrando…' : 'Entrar'}</Text>
          </Pressable>

          <Pressable accessibilityRole="button" onPress={resetPassword}
            disabled={busy || resetting || remaining > 0}
            accessibilityState={{ disabled: busy || resetting || remaining > 0, busy: resetting }}
            style={styles.backButton}>
            <Text style={styles.backText}>{resetting ? 'Solicitando recuperação…' : remaining > 0 ? `Reenviar recuperação em ${remaining}s` : 'Esqueci minha senha'}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            disabled={busy || resetting}
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
