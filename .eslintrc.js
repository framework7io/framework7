module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['react', 'svelte3'],
  globals: {
    XMLHttpRequest: true,
    Blob: true,
    Document: true,
    FormData: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-mixed-operators': [
      'error',
      {
        // the list of arthmetic groups disallows mixing `%` and `**`
        // with other arithmetic operators.
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'prefer-destructuring': ['off'],
    'prefer-object-spread': ['off'],
    'prefer-ob': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/no-string-refs': ['off'],
    'react/prop-types': ['off'],
    'no-restricted-globals': ['error', 'window', 'document'],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['**/*.jsx', 'src/react/utils/*.js'],
      rules: {
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/extensions': ['off'],
        'no-dupe-keys': ['off'],
      },
    },
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': ['off'],
        'import/first': ['off'],
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/prefer-default-export': ['off'],
        'import/extensions': ['off'],
        'no-multiple-empty-lines': ['off'],
        'no-undef-init': ['off'],
        'no-shadow': ['off'],
        'no-nested-ternary': ['off'],
        'a11y-invalid-attribute': ['off'],
        'a11y-missing-attribute': ['off'],
      },
    },
  ],
};
