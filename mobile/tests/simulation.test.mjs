import test from 'node:test';
import assert from 'node:assert/strict';
import { simulationInput, simulationMoney, requestSimulation } from '../src/services/simulation.ts';

test('normaliza vírgula e preserva centavos grandes', () => {
  assert.deepEqual(simulationInput('100,00', '12', '0,5'), { monthly_contribution: '100.00', months: 12, monthly_rate_percent: '0.5' });
  assert.equal(simulationMoney('9007199254740993.01'), 'R$ 9.007.199.254.740.993,01');
});
test('rejeita formatos e limites inválidos antes da requisição', () => {
  for (const args of [['0', '12', '0'], ['1.001', '12', '0'], ['100', '1.5', '0'], ['100', '601', '0'], ['100', '12', '5.1'], ['1e2', '12', '0'], ['100', '12', '-1']])
    assert.throws(() => simulationInput(...args));
});
test('trata rede, timeout, rejeição e resposta inválida', async () => {
  const previousFetch = globalThis.fetch;
  const previousUrl = process.env.EXPO_PUBLIC_API_URL;
  process.env.EXPO_PUBLIC_API_URL = 'http://localhost:8001';
  const input = simulationInput('100', '12', '0.5');
  const controller = new AbortController();
  try {
    globalThis.fetch = async () => { throw new TypeError('offline'); };
    await assert.rejects(requestSimulation(input, controller.signal), /Wi-Fi/);
    controller.abort();
    await assert.rejects(requestSimulation(input, controller.signal), /demorou/);
    globalThis.fetch = async () => new Response('{}', { status: 422 });
    await assert.rejects(requestSimulation(input, new AbortController().signal), /Confira os valores/);
    globalThis.fetch = async () => new Response('{"final_balance":"NaN"}');
    await assert.rejects(requestSimulation(input, new AbortController().signal), /inválida/);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.EXPO_PUBLIC_API_URL;
    else process.env.EXPO_PUBLIC_API_URL = previousUrl;
  }
});
