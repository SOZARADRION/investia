import { useEffect, useRef, useState } from 'react';
import { auth } from '@/services/firebase';
import { loadProfile, profileErrorMessage, saveProfile } from '@/services/profile';
import { Body, Button, Card, Field } from './investia-ui';

export function SavedProfile({ uid, busy, setBusy }: { uid: string; busy: boolean; setBusy: (value: boolean) => void }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Carregue seu perfil ou informe um nome para criar o primeiro registro.');
  const mounted = useRef(true);
  const pending = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  async function execute(save: boolean) {
    if (busy || pending.current) return;
    pending.current = true;
    setBusy(true);
    const active = () => mounted.current && auth.currentUser?.uid === uid;
    try {
      const result = save ? await saveProfile(name) : await loadProfile();
      if (!active()) return;
      setName(result ?? '');
      setMessage(save ? 'Nome salvo na sua conta.' : result === null ? 'Você ainda não tem um perfil salvo. Informe um nome e toque em Salvar nome.' : 'Perfil carregado da sua conta.');
    } catch (error) {
      if (active()) setMessage(profileErrorMessage(error));
    } finally {
      pending.current = false;
      if (active()) setBusy(false);
    }
  }
  return <Card title="Meu perfil salvo">
    <Body>Este nome fica salvo na sua conta e não altera o nome do cadastro.</Body>
    <Field label="Nome do perfil" value={name} onChangeText={setName} editable={!busy} maxLength={80} autoCapitalize="words" placeholder="Como quer ser chamado?" />
    <Body>{message}</Body>
    <Button label={busy ? 'Aguarde…' : 'Carregar perfil'} disabled={busy} onPress={() => execute(false)} />
    <Button label="Salvar nome" disabled={busy || !name.trim()} onPress={() => execute(true)} />
  </Card>;
}
