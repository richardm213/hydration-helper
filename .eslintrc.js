module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react-native/all',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'react/react-in-jsx-scope': 0,
    'react/style-prop-object': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': 0,
  },
  settings: {'import/core-modules': ['@expo/vector-icons']},
};
