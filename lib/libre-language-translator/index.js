const {
  init,  // returns a promise: library is ready to use once resolved
  get_input_languages,
  get_output_languages,
  is_valid_input_language,
  is_valid_output_language
} = require('./supported-languages')

const translate = require('./translate')

module.exports = {
  init,  // returns a promise: library is ready to use once resolved
  get_input_languages,
  get_output_languages,
  is_valid_input_language,
  is_valid_output_language,
  translate
}
