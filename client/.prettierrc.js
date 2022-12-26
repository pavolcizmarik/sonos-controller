module.exports = {
  tabWidth: 2,
  printWidth: 100,
  singleQuote: false,
  semi: true,
  bracketSpacing: true,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: "always",
  plugins: [require("prettier-plugin-tailwindcss")],
};
