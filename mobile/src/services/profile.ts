import { doc, getDocFromServer, runTransaction, serverTimestamp } from 'firebase/firestore';
import { getIdToken, reload } from 'firebase/auth';
import { auth, db } from './firebase';

async function ownProfile() {
  const user = auth.currentUser;
  if (!user) throw new Error('Entre novamente para acessar seu perfil.');
  await reload(user);
  if (!user.emailVerified) throw new Error('Confirme seu e-mail antes de acessar o perfil salvo.');
  await getIdToken(user, true);
  if (auth.currentUser?.uid !== user.uid) throw new Error('A conta mudou. Entre novamente.');
  return doc(db, 'users', user.uid);
}

export async function loadProfile() {
  const snapshot = await getDocFromServer(await ownProfile());
  return snapshot.exists() ? String(snapshot.data().displayName) : null;
}

export async function saveProfile(value: string) {
  const displayName = value.trim();
  if (!displayName || displayName.length > 80) throw new Error('Informe um nome entre 1 e 80 caracteres.');
  const ref = await ownProfile();
  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(ref);
    transaction.set(ref, {
      displayName,
      createdAt: snapshot.exists() ? snapshot.data().createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  return displayName;
}

export function profileErrorMessage(error: unknown) {
  const code = (error as { code?: string }).code;
  if (code === 'permission-denied') return 'Acesso negado. Confira a verificação do e-mail e as regras do Firestore.';
  if (code === 'unavailable' || code === 'auth/network-request-failed' || code === 'deadline-exceeded') return 'Não foi possível conectar. Confira sua internet e tente novamente.';
  if (code) return 'Não foi possível acessar o perfil. Tente novamente. Se continuar, saia da conta e entre novamente.';
  return error instanceof Error ? error.message : 'Não foi possível acessar o perfil.';
}
