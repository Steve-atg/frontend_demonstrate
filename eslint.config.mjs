import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('prettier'),
  ...compat.config({
    plugins: ['prettier', 'unused-imports'],
    extends: ['plugin:react/recommended'],
    rules: {
      'prettier/prettier': 'error',
      'linebreak-style': ['error', 'unix'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // React 17+ JSX Transform - no need to import React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off', // Disable prop-types since we use TypeScript
    },
  }),
  {
    files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Let unused-imports handle this
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-unsafe-argument': ['error'],
      '@typescript-eslint/no-unsafe-assignment': ['error'],
      '@typescript-eslint/no-unsafe-call': ['error'],
      '@typescript-eslint/no-unsafe-member-access': ['error'],
      '@typescript-eslint/no-unsafe-return': ['error'],
      '@typescript-eslint/no-require-imports': 'off', // Allow require in JS files
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'prefer-template': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'react/jsx-pascal-case': [
        'error',
        { allowAllCaps: true, allowNamespace: true },
      ],
      '@next/next/no-async-client-component': 'error',
    },
  },
  {
    files: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Allow require in JS files
      'react/prop-types': 'off', // Disable prop-types for JS files
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'scripts/**', // Ignore Node.js scripts
    ],
  },
];

export default eslintConfig;
