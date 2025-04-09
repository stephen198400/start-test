import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
	{
		ignores: [
			'node_modules/**',
			'.vercel/**',
			'.vinxi/**',
			'.output/**',
			'dist/**',
			'public/**',
			'**/*.d.ts',
		],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				document: 'readonly',
				navigator: 'readonly',
				window: 'readonly',
			},
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'@typescript-eslint': tsPlugin,
			'@tanstack/query': tanstackQueryPlugin,
		},
		rules: {
			// React规则
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// TypeScript规则
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',

			// Tanstack Query规则
			'@tanstack/query/exhaustive-deps': 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
