export default {
  'apps/api/**/*.{ts,tsx}': (files) => [
    `eslint --fix --config apps/api/eslint.config.mjs ${files.join(' ')}`,
    `prettier --write ${files.join(' ')}`,
  ],
  'apps/web/**/*.{ts,tsx}': (files) => [
    `eslint --fix --config apps/web/eslint.config.mjs ${files.join(' ')}`,
    `prettier --write ${files.join(' ')}`,
  ],
};
