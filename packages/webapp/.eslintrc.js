module.exports = {
  extends: ["@tim-mhn", "next", "next/core-web-vitals", "@tim-mhn"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};
