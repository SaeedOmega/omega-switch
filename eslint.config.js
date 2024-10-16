import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Add this rule for React 17+ support
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
]
