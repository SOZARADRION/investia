export type SimulationInput = { monthly_contribution: string; months: number; monthly_rate_percent: string };
export type SimulationResult = { total_contributed: string; hypothetical_earnings: string; final_balance: string };

export function simulationInput(amount: string, months: string, rate: string): SimulationInput {
  const contribution = amount.trim().replace(',', '.');
  const interest = rate.trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(contribution) || Number(contribution) <= 0 || Number(contribution) > 1000000)
    throw new Error('Informe um aporte de R$ 0,01 a R$ 1.000.000,00, com até duas casas decimais, sem separador de milhar.');
  if (!/^\d+$/.test(months.trim()) || Number(months) < 1 || Number(months) > 600)
    throw new Error('Informe um prazo inteiro de 1 a 600 meses.');
  if (!/^\d+(\.\d{1,4})?$/.test(interest) || Number(interest) > 5)
    throw new Error('Informe uma taxa de 0 a 5% ao mês, com até quatro casas decimais.');
  return { monthly_contribution: contribution, months: Number(months), monthly_rate_percent: interest };
}

export async function requestSimulation(input: SimulationInput, signal: AbortSignal): Promise<SimulationResult> {
  const base = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');
  if (!base) throw new Error('O simulador ainda não está configurado neste aplicativo.');
  let response: Response;
  try {
    response = await fetch(`${base}/simulations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input), signal });
  } catch {
    throw new Error(signal.aborted ? 'A consulta demorou demais. Tente novamente.' : 'Não foi possível conectar ao simulador. Confira o Wi-Fi e tente novamente.');
  }
  if (!response.ok) throw new Error(response.status === 422 ? 'Confira os valores informados e tente novamente.' : 'O simulador está indisponível. Tente novamente.');
  const data = await response.json();
  const monetary = (value: unknown) => typeof value === 'string' && /^\d+\.\d{2}$/.test(value);
  if (!monetary(data?.total_contributed) || !monetary(data?.hypothetical_earnings) || !monetary(data?.final_balance))
    throw new Error('O simulador retornou uma resposta inválida. Tente novamente.');
  return data;
}

export function simulationMoney(value: string) {
  const [whole, cents] = value.split('.');
  return `R$ ${whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${cents}`;
}
