const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{css,scss}': ['npx stylelint src/**/*.{css,scss,sass} --fix'],
  '*': ['npx prettier --write "src/**/*.{js,jsx,ts,tsx,json}"'],
};
