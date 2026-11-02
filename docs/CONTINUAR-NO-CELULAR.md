# InvestIA — registro para continuar pelo celular

Este documento é um resumo de continuidade da conversa, não uma transcrição
integral. Reúne decisões, trabalho realizado, testes e próximo passo, sem
senhas, dados de contas de teste ou capturas pessoais.

## Preferência de acompanhamento

O usuário pediu que o progresso possa ser consultado também pelo celular.
A cada etapa salva, atualizar este registro e os documentos da entrega,
enviar ao GitHub e informar o link de acesso. Não afirmar que uma conversa do
aplicativo foi sincronizada apenas porque o código foi enviado ao GitHub.

## Onde estamos — 30/10/2026

- Aplicativo React Native com Expo SDK 58, TypeScript estrito e Expo Router.
- Projeto local: pasta `investia/mobile`.
- Repositório privado: SOZARADRION/investia, branch `master`.
- Arquitetura definida: aplicativo Expo, Firebase e futura API Python/FastAPI.
- Prioridades: custo mínimo, segurança e orientação passo a passo no Windows.
- Os arquivos existentes foram preservados. As mudanças são registradas no Git.

## Entregas concluídas e testes

### A01 — primeiras telas

Boas-vindas, login e cadastro inicialmente simulados, com navegação até Início.
O usuário validou campos obrigatórios, senha curta, confirmação divergente,
entrada simulada e saída no Android com Expo Go.

### A02 — quatro abas

Início, Chat, Simulador e Perfil implementados. O usuário confirmou:

- Navegação pelas abas e atalhos.
- Chat com resposta fixa, envio vazio desabilitado e limpeza da conversa.
- Acesso aos botões com teclado e rolagem.
- Simulador: campos vazios, cenário válido, prazo zero e limpeza.
- Rejeição de aporte negativo e prazo fracionário.
- Limpeza do Chat e Simulador após sair e entrar novamente.
- Troca entre temas claro/escuro.
- Fonte ampliada em dois níveis sem problemas relatados.
- Voltar do Android fecha o teclado e retorna das abas ao Início.

O teste de letras no aporte não foi executado: o teclado numérico e a falta
de acesso à conversa pelo celular impediram inserir o texto de teste.

## B01 — autenticação Firebase em andamento

- Projeto Firebase: InvestIA, ID `investia-86c02`.
- O usuário informou que ativou Analytics no console. Não foi necessário
  recriar o projeto; o aplicativo não inicializa Analytics.
- O usuário confirmou E-mail/senha habilitado no Authentication.
- Aplicativo web registrado para fornecer a configuração ao SDK usado no Expo.
- Firebase JS SDK e AsyncStorage instalados.
- Cadastro, login, restauração de sessão e saída ligados ao Firebase.
- Perfil exibe nome e e-mail da conta conectada.
- Abas protegidas por sessão; Chat e Simulador seguem demonstrativos.
- Um erro Unmatched Route foi corrigido mantendo a rota raiz disponível e
  encaminhando usuários autenticados ao painel.
- Captura do usuário confirmou o Perfil com uma conta Firebase conectada.

### Verificações técnicas

TypeScript e lint passaram, inclusive após a correção da rota inicial.
A exportação Android passou com Firebase antes dessa última correção.
Os testes manuais de conta ainda não cobrem todos os fluxos.

## Atualização — 01/11/2026

O usuário confirmou no Android a restauração da conta ao reabrir o projeto,
a saída com retorno às boas-vindas e a permanência desconectado após reabrir.
Voltar após sair levou ao Expo Go, sem acesso às abas protegidas.
Uma senha incorreta foi rejeitada; a senha correta permitiu nova entrada,
com nome e e-mail exibidos no Perfil.

Também foram confirmados: cadastro duplicado rejeitado com a conta original
preservada, limpeza de Chat e Simulador após sair/entrar e aviso de conexão
no login sem internet. As capturas pessoais não foram adicionadas ao repositório.
Após reativar a internet, a entrada funcionou sem fechar o aplicativo.
A B01 está validada nos testes manuais planejados no Android.

## Próximo passo exato

Continuar os testes no Android, um por vez:

1. B02 concluída nos testes manuais em 02/11/2026: recuperação sem internet
   mostrou aviso de conexão; após reconectar, a solicitação iniciou a contagem
   e o botão voltou a ficar disponível ao final dos 60 segundos.
2. Os fluxos principais já foram confirmados em 01/11/2026: Perfil exibiu
   E-mail verificado após confirmar pelo link; recuperação chegou ao spam,
   senha foi redefinida e a entrada com a nova senha funcionou.
   O usuário também confirmou rejeição da senha antiga e os avisos para
   e-mail vazio e inválido na recuperação.
3. Próxima entrega a definir com o usuário: Firestore com regras restritivas
   e armazenamento mínimo de dados. Não criar banco ou publicar regras sem
   preparar e conferir o escopo dessa entrega.

Não compartilhar senhas nesta conversa nem salvá-las nos documentos.
Não recriar a conta de teste apenas para repetir um login.

## O que ainda não foi implementado

Firestore e suas regras, FastAPI, IA, cálculos financeiros reais e exclusão
de conta. Recuperação de senha e verificação de e-mail foram implementadas
na B02, com os testes manuais planejados validados no Android em 02/11/2026.
Não considerar a autenticação pronta para produção antes de revisar esses pontos.

## Como abrir e continuar

No celular, entrar na conta GitHub com acesso a este repositório privado e
abrir este documento. Ele permite recuperar o contexto em outra conversa.

O envio ao GitHub não sincroniza automaticamente o histórico do aplicativo.
Para retomar o mesmo ambiente do computador pelo ChatGPT móvel, configurar
acesso remoto quando disponível na conta. O computador precisa estar ligado,
conectado e com o aplicativo aberto.

O InvestIA no Expo Go, no fluxo local atual, também depende do servidor Expo
no computador e de uma conexão de rede que permita alcançá-lo. O endereço IP
pode mudar; não assumir que o endereço de uma sessão anterior continua válido.

## Outros trabalhos desta conversa

- Perfil GitHub SOZARADRION recebeu README e banner em repositório próprio.
- InvestIA recebeu README, banner, descrição, tópicos e documentação.
- swap-display-dash recebeu organização documental, banner, configuração de
  exemplo e automação Quality; a execução no GitHub passou na ocasião.
- A bio curta do perfil não foi alterada: a autenticação usada não permitiu.

## Documentos de apoio

- [Apresentação do InvestIA](../README.md)
- [Registro da A02](../mobile/docs/a02.md)
- [Implementação e testes B01](../mobile/docs/b01.md)
- [Pendências técnicas](technical-notes.md)
