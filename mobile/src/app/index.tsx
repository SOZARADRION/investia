import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.brand}>InvestIA</Text>

        <Text style={styles.title}>
          Seu primeiro passo no mundo dos investimentos.
        </Text>

        <Text style={styles.description}>
          Aprenda com clareza e organize sua jornada como investidor.
        </Text>
        <Link
          href="/login"
          style={{
            backgroundColor: '#34D399',
            color: '#0F172A',
            padding: 16,
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
          }}
        >
          Entrar
        </Link>
        <Link href="/cadastro" style={styles.secondaryLink}>
          Criar conta
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  brand: {
    color: '#34D399',
    fontSize: 24,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  description: {
    color: '#CBD5E1',
    fontSize: 18,
    lineHeight: 28,
  },
  secondaryLink: {
    color: '#34D399',
    borderWidth: 1,
    borderColor: '#34D399',
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});