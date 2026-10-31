export function authErrorMessage(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    case 'auth/invalid-email': return 'Informe um e-mail válido.';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'Não foi possível entrar. Confira o e-mail e a senha.';
    case 'auth/email-already-in-use': return 'Não foi possível criar a conta. Tente entrar com seu e-mail.';
    case 'auth/weak-password':
    case 'auth/password-does-not-meet-requirements': return 'A senha não atende aos requisitos. Use pelo menos 6 caracteres ou confira a política do projeto.';
    case 'auth/network-request-failed': return 'Não foi possível conectar. Confira sua internet e tente novamente.';
    case 'auth/too-many-requests': return 'Muitas tentativas. Aguarde um pouco antes de tentar novamente.';
    case 'auth/user-disabled': return 'Não foi possível acessar esta conta.';
    case 'auth/operation-not-allowed': return 'O login por e-mail e senha não está habilitado no projeto.';
    default: return 'Não foi possível concluir. Tente novamente em instantes.';
  }
}
