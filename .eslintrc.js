module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './app/tsconfig.json']
  },
  extends: [
    'airbnb-typescript',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: './tsconfig.json'
  }
};
