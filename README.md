<div align="center">

![InvestIA — Entenda antes de investir](docs/assets/investia-banner.svg)

**Educação financeira com clareza, um passo de cada vez.**

Aplicativo em desenvolvimento para ajudar iniciantes a explorar conceitos e cenários de investimento.

[Começar](#executar-no-windows) · [Funcionalidades](#o-que-já-funciona) · [Roadmap](#próximas-etapas) · [Registro de testes](mobile/docs/a02.md)

![Expo SDK 58](https://img.shields.io/badge/Expo-SDK_58-0F172A?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-Mobile-087EA4?style=flat-square&logo=react&logoColor=white)
![Status](https://img.shields.io/badge/Status-Protótipo_funcional-047857?style=flat-square)

</div>

## O projeto

O InvestIA nasce de uma pergunta: como tornar o aprendizado sobre investimentos mais acessível para quem está começando?

A proposta é reunir explicações, conversas educativas e simulações em uma experiência simples. O desenvolvimento acontece em pequenas entregas, com testes no Android antes de avançar para novas integrações.

**Estado atual:** protótipo local com navegação e dados de demonstração. Login e cadastro são simulados; o Chat usa uma resposta fixa; o Simulador confere campos, mas ainda não calcula resultados. Não há conexão com bancos, IA ou dados de mercado.

## O que já funciona

| Área | Experiência disponível |
| --- | --- |
| Boas-vindas | Apresentação e acesso ao login e cadastro |
| Login e cadastro | Formulários simulados com validações |
| Início | Conteúdo educativo e atalhos para as ferramentas |
| Chat | Pergunta de exemplo, resposta fixa e limpeza da conversa |
| Simulador | Aporte, prazo e taxa hipotética com validação de preenchimento |
| Perfil | Informações da demonstração e saída com limpeza dos dados das abas |

As quatro abas acompanham o tema claro ou escuro do aparelho. A revisão visual de temas e fonte ampliada ainda está pendente.

## Tecnologias

**Implementadas:** React Native, Expo SDK 58, TypeScript em modo estrito e Expo Router.

**Planejadas:** Firebase para autenticação e dados; Python com FastAPI para regras de negócio e cálculos. Essas integrações ainda não foram implementadas.

## Executar no Windows

Pré-requisitos: Git, Node.js compatível com o SDK Expo e npm. Para testar em um celular Android, use Expo Go compatível com SDK 58 e a mesma rede Wi-Fi do computador.

```powershell
git clone https://github.com/SOZARADRION/investia.git
cd investia/mobile
npm ci
npm start -- --lan --port 8082
```

Abra no Expo Go o endereço exibido no terminal. Use somente dados fictícios nos formulários. Se o repositório for privado, o clone exige uma conta com acesso.

Para quem já tem o projeto no computador, comece em `investia/mobile`; não é necessário clonar novamente.

## Qualidade e validação

```powershell
npx tsc --noEmit
npm run lint
```

Os fluxos da A01 e os testes funcionais principais da A02 foram validados manualmente pelo autor em um Android com Expo Go. TypeScript e lint passaram após a correção da limpeza ao sair. A exportação Android passou antes dessa última correção.

O projeto ainda não possui uma suíte automatizada de testes de interface. Consulte o [registro de validação](mobile/docs/a02.md) e as [pendências técnicas](docs/technical-notes.md).

## Estrutura

```text
investia/
├── docs/                      # Apresentação e notas técnicas
├── mobile/
│   ├── src/app/               # Rotas, boas-vindas e formulários
│   │   └── (tabs)/            # Início, Chat, Simulador e Perfil
│   ├── src/components/        # Componentes e sessão demonstrativa
│   ├── assets/                # Recursos visuais do aplicativo
│   └── docs/                  # Entregas e validação no Android
└── backend/                   # Pasta reservada; sem API implementada
```

## Próximas etapas

- [x] A01 — Boas-vindas e acesso simulado.
- [x] A02 — Quatro abas e validação funcional principal no Android.
- [ ] Revisar temas, fonte ampliada e navegação pelo botão Voltar.
- [ ] Ampliar os casos de validação do Simulador.
- [ ] Integrar autenticação real com Firebase.
- [ ] Implementar API FastAPI e cálculos determinísticos com testes.
- [ ] Integrar funcionalidades de IA após validar a base do produto.

## Responsabilidade e privacidade

O InvestIA tem finalidade educativa. O protótipo não oferece recomendações personalizadas nem executa investimentos. Não informe senhas reais, dados bancários ou informações pessoais nos exemplos.

Credenciais de servidor e chaves privadas não devem ser incluídas no aplicativo ou no Git. A autenticação atual é apenas uma simulação de navegação.

## Autor

Desenvolvido por [Adrion Sozar](https://github.com/SOZARADRION), em uma jornada de aprendizado e construção incremental de software.

O aplicativo foi iniciado com o template Expo. Os avisos de licença do template estão preservados em [mobile/LICENSE](mobile/LICENSE).
