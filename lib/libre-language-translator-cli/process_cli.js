const translate = require('../libre-language-translator/translate')

const process_cli = async function(argv_vals) {
  const translated_strings_array = await translate(
    argv_vals["--api-key"],
    argv_vals["--api-url"],
    argv_vals["--input-language"],
    argv_vals["--output-language"],
    [
      argv_vals["--input-string"]
    ],
    /* optimize_duplicates= */ false
  )

  if (!Array.isArray(translated_strings_array) || (translated_strings_array.length !== 1))
    throw new Error('ERROR: LibreTranslate service API returned an incorrect number of string translations.')

  console.log(translated_strings_array[0])
}

module.exports = process_cli
