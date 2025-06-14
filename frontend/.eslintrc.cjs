module.exports = {
  extends: ['../.eslintrc.cjs', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  settings: { react: { version: 'detect' } },

  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
