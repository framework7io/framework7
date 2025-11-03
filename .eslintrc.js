const rules = {
  'no-lonely-if': 'off',
  'no-bitwise': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-nested-ternary': 'off',
  'no-constructor-return': 'off',
  'default-param-last': 'off',
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
  'no-underscore-dangle': ['off'],
  'prefer-destructuring': ['off'],
  'prefer-object-spread': ['off'],
  'prefer-ob': ['off'],
  'react/react-in-jsx-scope': ['off'],
  'react/no-string-refs': ['off'],
  'react/prop-types': ['off'],
  'no-restricted-globals': ['error', 'window', 'document'],
  'import/prefer-default-export': 'off',
  'import/no-unresolved': [2, { ignore: ['ssr-window', 'framework7-svelte', 'swiper/svelte'] }],
};

module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },

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
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    ...rules,
  },
  overrides: [
    // Core + REACT
    {
      files: ['**/*.jsx', '**/*.js', '**/*.ts'],
      extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
      plugins: ['react'],
      rules: {
        ...rules,
        'import/extensions': [2, { js: 'always', jsx: 'always', json: 'always' }],
      },
    },
    {
      files: ['**/*.jsx', 'src/react/shared/*.js'],
      rules: {
        ...rules,
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'no-dupe-keys': ['off'],
        'import/extensions': [2, { js: 'always' }],
      },
    },
    // Core
    {
      files: ['src/core/**/*.js'],
      extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
      plugins: ['react'],
      rules: {
        ...rules,
        'react/no-unknown-property': ['off'],
        'react/jsx-key': ['off'],
        'import/extensions': [2, { js: 'always' }],
      },
    },

    // REACT KITCHEN_SINK
    {
      files: ['kitchen-sink/react/src/**/*.jsx', 'kitchen-sink/react/src/**/*.js'],
      rules: {
        ...rules,
        'react/display-name': ['off'],
        'react/jsx-no-target-blank': ['off'],
        'react/no-unescaped-entities': ['off'],
        'no-console': ['off'],
        'no-restricted-globals': ['off'],
        'no-nested-ternary': ['off'],
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
      },
    },
    // VUE
    {
      files: ['**/*.vue'],
      plugins: ['vue'],
      extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended'],
      rules: {
        ...rules,
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/require-default-prop': ['off'],
        'vue/custom-event-name-casing': ['off'],
        'prefer-destructuring': ['off'],
        'no-restricted-globals': ['off'],
        'vue/multi-word-component-names': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
      },
    },
    {
      files: ['**/*.vue', 'src/vue/shared/*.js'],
      rules: {
        ...rules,
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/extensions': ['off'],
        'no-restricted-globals': ['off'],
        'vue/multi-word-component-names': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
      },
    },
    // SVELTE KITCHEN_SINK
    {
      files: ['kitchen-sink/svelte/src/**/*.js'],
      rules: {
        ...rules,
        'no-restricted-globals': ['off'],
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
      },
    },
  ],
};
