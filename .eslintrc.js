module.exports = {
  'extends': [
    'plugin:react/recommended',
    'airbnb-base',
  ],
  'plugins': [
    'import',
    'react',
    'svelte3',
  ],
  'globals': {
    "window": true,
    "document": true,
    "XMLHttpRequest": true,
    "Blob": true,
    "Document": true,
    "FormData": true,
  },
  rules: {
    'max-len': ['error', 1000, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 9, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 9, multiline: true, consistent: true }
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'no-param-reassign': ['error', {
      props: false,
    }],
    'no-mixed-operators': ['error', {
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
      allowSamePrecedence: false
    }],
    'prefer-destructuring': ['off'],
    'prefer-ob': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/no-string-refs': ['off'],
    'react/prop-types': ['off'],
    'linebreak-style': ['off'],
    'arrow-parens': ['off'],
    'prefer-object-spread': ['off'],
  },
  overrides: [
    {
      files: ['**/*.jsx'],
      rules: {
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/extensions': ['off'],
        'no-dupe-keys': ['off'],
      }
    },
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/no-mutable-exports': ['off'],
        'import/first': ['off'],
        'import/no-unresolved': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/extensions': ['off'],
        'no-multiple-empty-lines': ['off'],
        'no-undef-init': ['off'],
        'no-shadow': ['off'],
        'no-nested-ternary': ['off'],
        'a11y-invalid-attribute': ['off'],
        'a11y-missing-attribute': ['off'],
      }
    }
  ],
};
