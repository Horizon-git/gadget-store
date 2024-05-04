module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh' ,'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
