import { router } from 'expo-router';
import { Body, Button, Card, Screen } from '@/components/investia-ui';
import { useDemoSession } from '@/components/demo-session';
export default function PerfilScreen() {
  const { clear } = useDemoSession();
  return <Screen title="Seu espaço de aprendizado.">
    <Card title="Visitante da demonstração"><Body>Nenhuma conta foi autenticada. Nome, e-mail e senha não estão vinculados a um perfil real.</Body></Card>
    <Card title="Preferências">
      <Body>A aparência destas quatro abas acompanha o tema claro ou escuro do seu celular.</Body>
      <Body>Preferências de conta e histórico estarão disponíveis em etapas futuras.</Body>
    </Card>
    <Card title="Sobre o InvestIA">
      <Body>Versão de desenvolvimento · Entrega A02. Educação financeira para quem está começando.</Body>
      <Body>Sem conexão com bancos, serviços de IA ou dados de mercado.</Body>
    </Card>
    <Button label="Sair da demonstração" onPress={() => { clear(); router.dismissTo('/'); }} />
  </Screen>;
}
