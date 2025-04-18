const read_cache = require('./cache')

let cached_data     = null
let input_languages = null

// ----------------------------------------------------------------------------- init

const init = async () => {
  try {
    cached_data     = await read_cache()
    input_languages = cached_data.map(lang => lang.code)
  }
  catch(e) {
    if (e.why) {
      switch(e.why) {
        case 1:
          console.log('API did not respond')
          break
        case 2:
          console.log('API response could not be parsed as JSON:' + "\n" + e.json)
          break
      }
    }
    else {
      console.log(e.message)
    }
    process.exit(1)
  }
}

// ----------------------------------------------------------------------------- getters

const get_input_languages = () => input_languages

const get_output_languages = (input_language) => {
  if (!is_valid_input_language(input_language)) return []

  for (let lang of cached_data) {
    if (lang.code === input_language) return lang.targets
  }
  return []
}

// ----------------------------------------------------------------------------- validation

const is_valid_input_language = (input_language) => {
  return input_languages && (input_languages.indexOf(input_language) !== -1)
}

const is_valid_output_language = (input_language, output_language) => {
  const output_languages = get_output_languages(input_language)

  return output_languages && (output_languages.indexOf(output_language) !== -1)
}

// -----------------------------------------------------------------------------

module.exports = {
  loading: init(),  // promise: library is ready to use once resolved
  get_input_languages,
  get_output_languages,
  is_valid_input_language,
  is_valid_output_language
}
