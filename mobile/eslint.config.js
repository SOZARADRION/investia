// https://docs.expo.dev/guides/using-eslint/
const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  globalIgnores([
    'node_modules/*',
    'node_modules-sdk57-backup/*',
    '.expo/*',
    'dist/*',
    'web-build/*',
    'ios/*',
    'android/*',
    'expo-env.d.ts',
  ]),
  expoConfig,
]);
