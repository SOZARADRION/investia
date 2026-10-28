import { useState } from 'react';
import { router } from 'expo-router';
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

  function handleSignUp() {
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

    Alert.alert(
      'Cadastro simulado',
      'Este é um ambiente de demonstração. Nenhuma conta foi criada e nenhum dado foi salvo.',
      [{ text: 'OK', onPress: () => router.replace('/login') }],
      { cancelable: false }
    );
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
            Use dados fictícios para testar esta tela.
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
            style={styles.button}
          >
            <Text style={styles.buttonText}>Criar conta</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
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
