import 'firebase/auth';
import type { Persistence } from 'firebase/auth';
import type AsyncStorage from '@react-native-async-storage/async-storage';

// Metro carrega a implementação React Native, mas a declaração padrão do
// pacote firebase/auth não reexporta este helper da implementação nativa.
declare module 'firebase/auth' {
  export function getReactNativePersistence(
    storage: Pick<typeof AsyncStorage, 'getItem' | 'setItem' | 'removeItem'>,
  ): Persistence;
}
