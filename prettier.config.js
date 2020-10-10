/**
 * @type {import('prettier').Options}
 */
const config = {
  // We need to use double quotes for consistency with .hbs files since Prettier
  // in single-quote mode will still double-quote HTML attributes, which causes
  // ember-template-lint (with `quote` set to "single") to emit errors.
  singleQuote: false,
};

module.exports = config;
