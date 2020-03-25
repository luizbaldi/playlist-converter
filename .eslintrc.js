module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./app/tsconfig.json"]
  },
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "comma-dangle": "off"
  }
};
