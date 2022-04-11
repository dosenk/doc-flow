module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // 'plugin:import/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    semi: 0,
    'comma-dangle': 0,
    'prettier/prettier': 'error',
    'no-unused-vars': 0,
    // 'prettier/prettier': [
    //   0,
    //   {
    //     endOfLine: 'auto'
    //   }
    // ],
    // Разрешить стрелочные компонеты jsx. Все из-за "eslint-config-airbnb": "^19.0.4",
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['function-declaration', 'function-expression', 'arrow-function'],
        unnamedComponents: ['function-expression', 'arrow-function']
      }
    ],
    // циклический импорт
    'import/no-cycle': [
      0,
      {
        maxDepth: 10,
        ignoreExternal: true
      }
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never'
      }
    ],
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/require-default-props': 0,
    // disable spread in props {...props}
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0
  }
  /*  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        path: ['node_modules', 'src/']
      }
    },
    'import/extensions': ['.js', '.jsx']
  } */
};
