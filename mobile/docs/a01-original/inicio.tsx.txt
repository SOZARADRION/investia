import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InicioScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.brand}>InvestIA</Text>

      <Text style={styles.title}>Bem-vindo ao seu início!</Text>

      <Text style={styles.description}>
        Aqui você acompanhará sua jornada de aprendizado sobre investimentos.
      </Text>

      <Text style={styles.notice}>
        Ambiente de demonstração. Nenhuma conta foi autenticada.
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.dismissTo('/')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sair da demonstração</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
    backgroundColor: '#0F172A',
  },
  brand: {
    color: '#34D399',
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: '#CBD5E1',
    fontSize: 18,
    lineHeight: 28,
  },
  notice: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#34D399',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
});