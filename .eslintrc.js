module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
  },
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "quotes": [
      "error",
      "single",
    ],
    "semi": [
      "error",
      "always",
    ],
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};