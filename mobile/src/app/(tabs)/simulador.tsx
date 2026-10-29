import { useState } from 'react';
import { View } from 'react-native';
import { Body, Button, Card, Field, Screen } from '@/components/investia-ui';
export default function SimuladorScreen() {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [rate, setRate] = useState('');
  const [message, setMessage] = useState('');
  function preview() {
    const aporte = Number(amount.trim().replace(',', '.'));
    const prazo = Number(months.trim());
    const taxa = Number(rate.trim().replace(',', '.'));
    if (!amount.trim() || !months.trim() || !rate.trim() || !Number.isFinite(aporte) || aporte <= 0 || !Number.isInteger(prazo) || prazo <= 0 || !Number.isFinite(taxa) || taxa < 0) {
      setMessage('Informe um aporte maior que zero, um prazo inteiro positivo e uma taxa igual ou maior que zero. Use vírgula ou ponto para decimais, sem separador de milhar.');
      return;
    }
    setMessage('Campos preenchidos. Os cálculos ainda não estão disponíveis nesta demonstração. Nenhuma projeção de retorno foi gerada.');
  }
  return <Screen title="Explore cenários.">
    <Body>Formulário de demonstração. Os valores são hipotéticos e não representam rentabilidade garantida.</Body>
    <Card title="Seu cenário de exemplo">
      <Field label="Aporte mensal (R$)" placeholder="Ex.: 100,00" keyboardType="decimal-pad" value={amount} onChangeText={(v) => { setAmount(v); setMessage(''); }} maxLength={15} />
      <Field label="Prazo (meses)" placeholder="Ex.: 12" keyboardType="number-pad" value={months} onChangeText={(v) => { setMonths(v); setMessage(''); }} maxLength={6} />
      <Field label="Taxa hipotética (% ao mês)" placeholder="Ex.: 0,5" keyboardType="decimal-pad" value={rate} onChangeText={(v) => { setRate(v); setMessage(''); }} maxLength={10} />
      <Button label="Conferir campos" onPress={preview} />
      <Button label="Limpar campos" onPress={() => { setAmount(''); setMonths(''); setRate(''); setMessage(''); }} />
    </Card>
    {message ? <View accessibilityLiveRegion="polite"><Card title="Sobre este cenário"><Body>{message}</Body></Card></View> : null}
    <Body>O motor de cálculos será implementado em uma etapa futura. Nenhum dado é salvo em servidor.</Body>
  </Screen>;
}
