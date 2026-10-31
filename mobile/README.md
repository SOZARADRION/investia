# InvestIA · Aplicativo mobile

React Native + Expo SDK 58 + TypeScript + Expo Router.

Consulte a [apresentação do projeto](../README.md) para funcionalidades, arquitetura e roadmap.

## Executar

Na pasta mobile:

```powershell
npm ci
npm start -- --lan --port 8082
```

Abra o endereço do terminal no Expo Go compatível com SDK 58. Computador e celular devem estar na mesma rede Wi-Fi. O cadastro cria uma conta de teste no Firebase; use senha exclusiva.

## Verificar

```powershell
npx tsc --noEmit
npm run lint
```

- [Entrega A02 e validação no Android](docs/a02.md)
- [Pendências técnicas e registro de segurança](../docs/technical-notes.md)
- [Licença do template Expo](LICENSE)

Não execute reset-project para iniciar o aplicativo: esse utilitário do template reorganiza as telas.

Cadastro, login e saída usam Firebase Authentication. Consulte [Entrega B01](docs/b01.md) para os testes pendentes no Android. Firestore, FastAPI, IA e cálculos financeiros ainda não foram implementados.
