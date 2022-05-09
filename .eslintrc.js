module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    'no-undef': ['off'],
    camelcase: ['off'],
    'no-restricted-syntax': ['off'],
    'no-param-reassign': ['off'],
    'no-use-before-define': ['off'],
    'no-plusplus': ['off'],
    'func-names': ['off'],
    'max-len': [
      'warn',
      {
        code: 110,
        tabWidth: 2,
        comments: 160,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
