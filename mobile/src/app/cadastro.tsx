import { useState } from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { authErrorMessage } from '@/services/auth-errors';
import { useAuthSession } from '@/components/auth-session';
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

export default function CadastroScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const { setCreating } = useAuthSession();

  async function handleSignUp() {
    if (busy) return;
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert(
        'Preencha os campos',
        'Informe nome, e-mail, senha e confirmação de senha.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert('Senha muito curta', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Senhas diferentes', 'A senha e a confirmação devem ser iguais.');
      return;
    }

    setBusy(true);
    setCreating(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
      try { await updateProfile(result.user, { displayName: name.trim() }); }
      catch { Alert.alert('Conta criada', 'Sua conta foi criada, mas o nome não pôde ser salvo. Você já pode usar o aplicativo.'); }
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Não foi possível criar a conta', authErrorMessage(error));
    } finally { setBusy(false); setCreating(false); }
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
          <Text style={styles.title}>Criar conta no InvestIA</Text>

          <Text style={styles.description}>
            Nome, e-mail e credenciais serão enviados ao Firebase para criar sua conta de teste. Use uma senha exclusiva para este projeto.
          </Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            accessibilityLabel="Nome"
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor="#94A3B8"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />

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
            placeholder="Mínimo de 6 caracteres"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            accessibilityLabel="Confirmar senha"
            style={styles.input}
            placeholder="Repita a senha"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            accessibilityRole="button"
            onPress={handleSignUp}
            disabled={busy}
            accessibilityState={{ disabled: busy, busy }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{busy ? 'Criando conta…' : 'Criar conta'}</Text>
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
