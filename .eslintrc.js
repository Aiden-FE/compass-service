module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    '@compass-aiden/eslint-config/nest',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'max-classes-per-file': 'off', // dto内会声明多个dto class
    '@typescript-eslint/no-throw-literal': 'off', // 支持 throw new HttpResponse() 快捷抛出返回并终止程序
  },
};
