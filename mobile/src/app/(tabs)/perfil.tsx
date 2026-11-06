import { useState } from 'react';
import { Alert } from 'react-native';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { useCooldown } from '@/hooks/use-cooldown';
import { auth } from '@/services/firebase';
import { authErrorMessage } from '@/services/auth-errors';
import { useAuthSession } from '@/components/auth-session';
import { Body, Button, Card, Screen } from '@/components/investia-ui';
import { useDemoSession } from '@/components/demo-session';
import { SavedProfile } from '@/components/saved-profile';
export default function PerfilScreen() {
  const { clear } = useDemoSession();
  const { user, emailVerified, refreshVerification } = useAuthSession();
  const [busy, setBusy] = useState(false);
  const { remaining, start } = useCooldown();
  async function verifyEmail() {
    if (busy || remaining > 0 || !user) return;
    setBusy(true);
    try {
      if (await refreshVerification()) {
        Alert.alert('E-mail verificado', 'Seu e-mail já foi confirmado.');
        return;
      }
      await sendEmailVerification(user);
      start();
      Alert.alert('Verifique seu e-mail', 'Enviamos um link de confirmação. Confira sua caixa de entrada e o spam. Depois de abrir o link, volte aqui e toque em Já confirmei meu e-mail.');
    } catch (error) { Alert.alert('Não foi possível enviar', authErrorMessage(error)); }
    finally { setBusy(false); }
  }
  async function checkVerification() {
    if (busy) return;
    setBusy(true);
    try {
      const verified = await refreshVerification();
      Alert.alert(verified ? 'E-mail verificado' : 'Confirmação pendente', verified ? 'Seu endereço foi confirmado com sucesso.' : 'A confirmação ainda não foi identificada. Abra o link mais recente recebido por e-mail e tente novamente.');
    } catch (error) { Alert.alert('Não foi possível conferir', authErrorMessage(error)); }
    finally { setBusy(false); }
  }
  async function leave() {
    if (busy) return;
    setBusy(true);
    try { await signOut(auth); clear(); }
    catch (error) { Alert.alert('Não foi possível sair', authErrorMessage(error)); }
    finally { setBusy(false); }
  }
  return <Screen title="Seu espaço de aprendizado.">
    <Card title={user?.displayName || 'Sua conta'}><Body>{user?.email}</Body><Body>Conta conectada pelo Firebase. As ferramentas financeiras continuam em demonstração.</Body></Card>
    <Card title={emailVerified ? 'E-mail verificado' : 'Confirme seu e-mail'}>
      <Body>{emailVerified ? 'Seu endereço de e-mail foi confirmado pelo Firebase.' : 'Confirme que você tem acesso a este endereço. A confirmação é aberta no navegador pelo link recebido por e-mail.'}</Body>
      {!emailVerified && <>
        <Button label={remaining > 0 ? `Reenviar em ${remaining}s` : 'Enviar e-mail de verificação'} disabled={busy || remaining > 0} onPress={verifyEmail} />
        <Button label={busy ? 'Aguarde…' : 'Já confirmei meu e-mail'} disabled={busy} onPress={checkVerification} />
      </>}
    </Card>
    {emailVerified && user && <SavedProfile key={user.uid} uid={user.uid} busy={busy} setBusy={setBusy} />}
    <Card title="Preferências">
      <Body>A aparência destas quatro abas acompanha o tema claro ou escuro do seu celular.</Body>
      <Body>Preferências de conta e histórico estarão disponíveis em etapas futuras.</Body>
    </Card>
    <Card title="Sobre o InvestIA">
      <Body>Versão de desenvolvimento · Entrega B. Educação financeira para quem está começando.</Body>
      <Body>Sem conexão com bancos, serviços de IA ou dados de mercado.</Body>
    </Card>
    <Button label={busy ? 'Aguarde…' : 'Sair da conta'} disabled={busy} onPress={leave} />
  </Screen>;
}
