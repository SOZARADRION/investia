# Notas técnicas

## Dependências e segurança

O registro anterior do projeto informa oito avisos no npm audit (cinco baixos e
três altos), associados a deepmerge e zod na cadeia de dependências do Expo.
Essa contagem é histórica e não foi consultada novamente nesta revisão documental.

A simulação anterior de npm audit fix manteve os avisos; usar --force propunha
um downgrade incompatível para Expo 51. A decisão registrada foi não aplicar
overrides nem alterações forçadas. Reavaliar as versões e os avisos antes de
publicar uma versão do aplicativo.

## Limitações atuais

- Autenticação Firebase implementada em 30/10/2026, aguardando validação de cadastro, login, saída e restauração de sessão no Android. Recuperação de senha, verificação de e-mail e exclusão de conta ainda não foram implementadas.
- Chat sem modelo de IA ou histórico persistente.
- Simulador sem motor de cálculo financeiro.
- iOS e web ainda não validados pelo autor nesta entrega.
- O caso com letras no aporte aguarda revisão. Valores negativos e prazo fracionário foram rejeitados corretamente no Android em 30/10/2026, conforme confirmação do usuário. Temas, fonte ampliada e botão Voltar também foram validados nessa data.

Não use o script reset-project para executar o aplicativo: ele reorganiza as
telas do projeto e pertence ao template original do Expo.
