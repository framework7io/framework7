module.exports = {
  'extends': [
    'plugin:react/recommended',
    'airbnb-base',
  ],
  'plugins': [
    'import',
    'react',
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
};
