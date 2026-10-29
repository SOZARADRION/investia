import { Redirect } from 'expo-router';

// Preserva a rota usada pelo login da A01.
export default function InicioScreen() {
  return <Redirect href="/painel" />;
}
