module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["*.html"],
      processor: "vue/.vue",
    },
  ],
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "vue/multi-word-component-names": 0,
    "no-var": "error",
    "prettier/prettier": "error",
    "no-console": "warn",
    "no-debugger": "warn",
    "no-duplicate-case": "warn",
    "no-empty": "warn",
    "no-extra-parens": "off",
    "no-func-assign": "warn",
    "no-unreachable": "warn",
    curly: "warn",
    "default-case": "warn",
    "dot-notation": "warn",
    eqeqeq: "warn",
    "no-else-return": "warn",
    "no-empty-function": "warn",
    "no-lone-blocks": "warn",
    "no-multi-spaces": "warn",
    "no-redeclare": "warn",
    "no-return-assign": "warn",
    "no-return-await": "warn",
    "no-self-assign": "warn",
    "no-self-compare": "warn",
    "no-useless-catch": "warn",
    "no-useless-return": "warn",
    "no-shadow": "off",
    "no-delete-var": "off",
    "array-bracket-spacing": "warn",
    "brace-style": "warn",
    indent: "off",
    "max-statements": ["warn", 100],
    "max-nested-callbacks": ["warn", 3],
    "max-params": ["warn", 3],
    "max-statements-per-line": ["warn", { max: 1 }],
    "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
    "no-lonely-if": "warn",
    "no-mixed-spaces-and-tabs": "warn",
    "no-multiple-empty-lines": "warn",
    semi: ["warn", "always"],
    singleQuote: [0],
    "space-before-blocks": "warn",
    "space-in-parens": "warn",
    "space-infix-ops": "warn",
    "space-unary-ops": "warn",
    "switch-colon-spacing": "warn",
    "arrow-spacing": "warn",
    "prefer-const": "warn",
    "prefer-rest-params": "warn",
    "no-useless-escape": "warn",
    "no-irregular-whitespace": "warn",
    "no-prototype-builtins": "warn",
    "no-fallthrough": "warn",
    "no-extra-boolean-cast": "warn",
    "no-case-declarations": "warn",
    "no-async-promise-executor": "warn",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
