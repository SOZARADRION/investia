import { router } from 'expo-router';
import { Body, Button, Card, Screen } from '@/components/investia-ui';
export default function PainelScreen() {
  return <Screen title="Entenda antes de investir.">
    <Body>Explore conceitos e conheça as ferramentas da sua jornada de aprendizado.</Body>
    <Card title="Por onde começar?">
      <Body>Conheça o formato de uma conversa educativa.</Body>
      <Button label="Abrir Chat" onPress={() => router.navigate('/chat')} />
      <Button label="Conhecer Simulador" onPress={() => router.navigate('/simulador')} />
    </Card>
    <Card title="Um conceito por vez"><Body>Diversificar é distribuir os investimentos entre alternativas. Isso pode reduzir a concentração de riscos, mas não elimina a possibilidade de perdas.</Body></Card>
    <Body>Sua conta usa autenticação Firebase. As ferramentas continuam em demonstração: não há cotações, cálculos ou análises reais nesta etapa.</Body>
  </Screen>;
}
