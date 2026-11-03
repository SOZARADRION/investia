import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';

let env;
const projectId = 'demo-investia';
const verified = (uid = 'alice') => env.authenticatedContext(uid, { email_verified: true }).firestore();
const profile = () => ({ displayName: 'Perfil de teste', createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
const ref = (db, uid = 'alice') => doc(db, 'users', uid);

before(async () => {
  // Falha fechada: nunca usar um projeto real ou uma conexão remota nos testes.
  assert.equal(process.env.GCLOUD_PROJECT, projectId);
  assert.match(process.env.FIRESTORE_EMULATOR_HOST ?? '', /^(127\.0\.0\.1|localhost):\d+$/);
  env = await initializeTestEnvironment({
    projectId,
    firestore: { rules: await readFile(new URL('../firestore.rules', import.meta.url), 'utf8') },
  });
});
beforeEach(async () => { await env.clearFirestore(); });
after(async () => { await env?.cleanup(); });

async function seed() {
  await env.withSecurityRulesDisabled(async (context) => {
    await setDoc(ref(context.firestore()), {
      displayName: 'Original', createdAt: Timestamp.fromMillis(1000), updatedAt: Timestamp.fromMillis(1000),
    });
  });
}

test('nega leitura e criacao sem autenticacao', async () => {
  const db = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(ref(db)));
  await assertFails(setDoc(ref(db), profile()));
});
test('nega acesso do dono sem email verificado ou sem a claim', async () => {
  for (const claims of [{ email_verified: false }, {}]) {
    const db = env.authenticatedContext('alice', claims).firestore();
    await assertFails(getDoc(ref(db)));
    await assertFails(setDoc(ref(db), profile()));
  }
});
test('permite criacao com serverTimestamp e leitura pelo dono verificado', async () => {
  const db = verified();
  await assertSucceeds(setDoc(ref(db), profile()));
  const saved = await assertSucceeds(getDoc(ref(db)));
  assert.equal(saved.data().displayName, 'Perfil de teste');
  assert.ok(saved.data().createdAt instanceof Timestamp);
  assert.ok(saved.data().createdAt.isEqual(saved.data().updatedAt));
});
test('nega leitura, criacao e alteracao por outro UID verificado', async () => {
  const db = verified('bob');
  await assertFails(setDoc(ref(db), profile()));
  await seed();
  await assertFails(getDoc(ref(db)));
  await assertFails(updateDoc(ref(db), { displayName: 'Alterado', updatedAt: serverTimestamp() }));
});
test('permite atualizar nome preservando createdAt e renovando updatedAt', async () => {
  await seed();
  const db = verified();
  await assertSucceeds(updateDoc(ref(db), { displayName: 'Novo nome', updatedAt: serverTimestamp() }));
  const saved = await getDoc(ref(db));
  assert.equal(saved.data().displayName, 'Novo nome');
  assert.equal(saved.data().createdAt.toMillis(), 1000);
  assert.ok(saved.data().updatedAt.toMillis() > 1000);
});
test('nega substituicao de createdAt mesmo pelo dono', async () => {
  await seed();
  await assertFails(updateDoc(ref(verified()), { createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
});
test('nega timestamps escolhidos pelo cliente ou campos ausentes', async () => {
  const db = verified();
  await assertFails(setDoc(ref(db), { ...profile(), createdAt: Timestamp.fromMillis(1000) }));
  await assertFails(setDoc(ref(db), { ...profile(), updatedAt: Timestamp.fromMillis(1000) }));
  await assertFails(setDoc(ref(db), { displayName: 'Sem datas' }));
});
test('nega campos extras inclusive escalada de papel na criacao e atualizacao', async () => {
  const db = verified();
  await assertFails(setDoc(ref(db), { ...profile(), role: 'admin' }));
  await assertFails(setDoc(ref(db), { ...profile(), email: 'ficticio@example.test' }));
  await seed();
  await assertFails(updateDoc(ref(db), { role: 'admin', updatedAt: serverTimestamp() }));
});
test('nega nome vazio, longo ou com tipo incorreto; aceita limite de 80', async () => {
  const db = verified();
  for (const displayName of ['', 'x'.repeat(81), 123, null]) {
    await assertFails(setDoc(ref(db), { ...profile(), displayName }));
  }
  await assertSucceeds(setDoc(ref(db), { ...profile(), displayName: 'x'.repeat(80) }));
});
test('nega listagem, exclusao e acesso a outras colecoes ou subcolecoes', async () => {
  await seed();
  const db = verified();
  await assertFails(getDocs(collection(db, 'users')));
  await assertFails(deleteDoc(ref(db)));
  await assertFails(setDoc(doc(db, 'users/alice/private/example'), { value: 1 }));
  await assertFails(getDoc(doc(db, 'other/example')));
  await assertFails(setDoc(doc(db, 'other/example'), { value: 1 }));
});
