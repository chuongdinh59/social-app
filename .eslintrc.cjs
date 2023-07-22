// /* eslint-env node */

// module.exports = {
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended'
//   ],
//   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   settings: { react: { version: '18.2' } },
//   plugins: ['react-refresh'],
//   rules: {
//     'jsx-a11y/anchor-is-valid': 'off',
//     'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
//   }
// };

module.exports = {
  extends: ['react-app'],
  rules: {},
  overrides: [
    {
      files: ['**/*.js?(x)'],
      rules: {
        // ******** add ignore rules here *********
        'react/no-unescaped-entities': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off'
      }
    }
  ]
};
