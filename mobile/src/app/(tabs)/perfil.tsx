import { useState } from 'react';
import { Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { authErrorMessage } from '@/services/auth-errors';
import { useAuthSession } from '@/components/auth-session';
import { Body, Button, Card, Screen } from '@/components/investia-ui';
import { useDemoSession } from '@/components/demo-session';
export default function PerfilScreen() {
  const { clear } = useDemoSession();
  const { user } = useAuthSession();
  const [busy, setBusy] = useState(false);
  async function leave() {
    if (busy) return;
    setBusy(true);
    try { await signOut(auth); clear(); }
    catch (error) { Alert.alert('Não foi possível sair', authErrorMessage(error)); }
    finally { setBusy(false); }
  }
  return <Screen title="Seu espaço de aprendizado.">
    <Card title={user?.displayName || 'Sua conta'}><Body>{user?.email}</Body><Body>Conta conectada pelo Firebase. As ferramentas financeiras continuam em demonstração.</Body></Card>
    <Card title="Preferências">
      <Body>A aparência destas quatro abas acompanha o tema claro ou escuro do seu celular.</Body>
      <Body>Preferências de conta e histórico estarão disponíveis em etapas futuras.</Body>
    </Card>
    <Card title="Sobre o InvestIA">
      <Body>Versão de desenvolvimento · Entrega B. Educação financeira para quem está começando.</Body>
      <Body>Sem conexão com bancos, serviços de IA ou dados de mercado.</Body>
    </Card>
    <Button label={busy ? 'Saindo…' : 'Sair da conta'} disabled={busy} onPress={leave} />
  </Screen>;
}
