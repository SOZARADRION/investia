import { useEffect, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Body, Button, Card, Field, Screen } from '@/components/investia-ui';
import { requestSimulation, simulationInput, simulationMoney, type SimulationResult } from '@/services/simulation';
export default function SimuladorScreen() {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [rate, setRate] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => { active.current?.abort(); active.current = null; }, []);
  function resetOutput() { setMessage(''); setResult(null); }
  async function preview() {
    if (active.current) return;
    resetOutput();
    let input;
    try { input = simulationInput(amount, months, rate); }
    catch (error) { setMessage((error as Error).message); return; }
    Keyboard.dismiss();
    const controller = new AbortController();
    active.current = controller;
    setBusy(true);
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const data = await requestSimulation(input, controller.signal);
      if (active.current === controller) setResult(data);
    } catch (error) {
      if (active.current === controller) setMessage(error instanceof Error ? error.message : 'Não foi possível calcular. Tente novamente.');
    } finally {
      clearTimeout(timeout);
      if (active.current === controller) { active.current = null; setBusy(false); }
    }
  }
  return <Screen title="Explore cenários.">
    <Body>Simule aportes ao fim de cada mês com taxa hipotética constante. Os resultados não representam rentabilidade garantida.</Body>
    <Card title="Seu cenário de exemplo">
      <Field label="Aporte mensal (R$)" placeholder="Ex.: 100,00" keyboardType="decimal-pad" editable={!busy} value={amount} onChangeText={(v) => { setAmount(v); resetOutput(); }} maxLength={15} />
      <Field label="Prazo (meses)" placeholder="Ex.: 12" keyboardType="number-pad" editable={!busy} value={months} onChangeText={(v) => { setMonths(v); resetOutput(); }} maxLength={6} />
      <Field label="Taxa hipotética (% ao mês)" placeholder="Ex.: 0,5" keyboardType="decimal-pad" editable={!busy} value={rate} onChangeText={(v) => { setRate(v); resetOutput(); }} maxLength={10} />
      <Button label={busy ? 'Calculando…' : 'Calcular cenário'} disabled={busy} onPress={preview} />
      <Button label="Limpar campos" disabled={busy} onPress={() => { setAmount(''); setMonths(''); setRate(''); resetOutput(); }} />
    </Card>
    {message ? <View accessibilityLiveRegion="polite"><Card title="Sobre este cenário"><Body>{message}</Body></Card></View> : null}
    {result && <View accessibilityLiveRegion="polite"><Card title="Resultado hipotético">
      <Body>Total aportado: {simulationMoney(result.total_contributed)}</Body>
      <Body>Rendimento hipotético: {simulationMoney(result.hypothetical_earnings)}</Body>
      <Body>Saldo final: {simulationMoney(result.final_balance)}</Body>
    </Card></View>}
    <Body>Não considera impostos, taxas ou inflação. Os valores são enviados para cálculo, sem salvar histórico.</Body>
  </Screen>;
}
