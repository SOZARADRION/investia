import { useState } from 'react';
import { View } from 'react-native';
import { Body, Button, Card, Field, Screen } from '@/components/investia-ui';
export default function ChatScreen() {
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState('');
  return <Screen title="Vamos aprender juntos?">
    <Body>Chat demonstrativo, sem inteligência artificial. Use perguntas fictícias e não informe dados pessoais.</Body>
    <Card title="InvestIA · Exemplo"><Body>Experimente perguntar: “O que é diversificação?”</Body></Card>
    {sent ? <View accessibilityLiveRegion="polite" style={{ gap: 16 }}>
      <Card title="Sua pergunta"><Body>{sent}</Body></Card>
      <Card title="Resposta fixa de demonstração"><Body>Este exemplo mostra como a conversa será apresentada. A análise de perguntas ainda não está disponível. Explore o Simulador e continue conhecendo o aplicativo.</Body></Card>
    </View> : null}
    <Field label="Sua pergunta" placeholder="Escreva uma pergunta de exemplo" value={question} onChangeText={setQuestion} multiline maxLength={500} />
    <Button label="Enviar exemplo" onPress={() => { if (question.trim()) { setSent(question.trim()); setQuestion(''); } }} disabled={!question.trim()} />
    <Button label="Limpar conversa" onPress={() => { setQuestion(''); setSent(''); }} disabled={!question && !sent} />
    <Body>Apenas a última pergunta fica na memória desta demonstração. Não há histórico salvo nem envio a serviços.</Body>
  </Screen>;
}
