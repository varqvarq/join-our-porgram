module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-alert": "off",
    "linebreak-style": "off",
    "keyword-spacing": "off",
    "import/extensions": "off",
    "no-trailing-spaces": "off",
    "no-alert": "off",
    "arrow-parens": "off",
    "eol-last": "off",
    "max-classes-per-file": "off",
    "no-console": "off"
  },
};
