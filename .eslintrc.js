const rules = {
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
};

module.exports = {
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
      rules: { ...rules },
    },
    {
      files: ['**/*.jsx', 'src/react/shared/*.js'],
      rules: {
        ...rules,
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/extensions': ['off'],
        'no-dupe-keys': ['off'],
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
      extends: [
        'plugin:vue/vue3-recommended',
        'airbnb-base',
        'plugin:prettier/recommended',
        'prettier/vue',
      ],
      rules: {
        ...rules,
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/require-default-prop': ['off'],
        'vue/custom-event-name-casing': ['off'],
        'prefer-destructuring': ['off'],
        'no-restricted-globals': ['off'],
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

    // SVELTE
    {
      plugins: ['svelte3'],
      files: ['**/*.svelte'],
      extends: ['airbnb-base'],
      processor: 'svelte3/svelte3',
      rules: {
        ...rules,
        'no-restricted-globals': ['off'],
        'object-curly-newline': ['off'],
        curly: ['off'],
        indent: ['off'],
        'operator-linebreak': ['off'],
        'nonblock-statement-body-position': ['off'],
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
        'max-len': ['off'],
      },
    },
    {
      files: ['kitchen-sink/svelte/src/**/*.svelte'],
      rules: {
        ...rules,
        'no-console': ['off'],
        'no-return-assign': ['off'],
        'implicit-arrow-linebreak': ['off'],
        'no-restricted-globals': ['off'],
      },
    },
  ],
};
