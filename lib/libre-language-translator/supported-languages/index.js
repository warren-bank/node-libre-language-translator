const {read_cache} = require('./cache')

const memory_cache = {}

// ----------------------------------------------------------------------------- init

const init = async (api_url) => {
  if (memory_cache[api_url]) return

  try {
    const cached_data     = await read_cache(api_url)  // read from file cache, or update from API server if stale
    const input_languages = cached_data.map(lang => lang.code)

    memory_cache[api_url] = {cached_data, input_languages}
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

const get_input_languages = (api_url) => memory_cache[api_url].input_languages

const get_output_languages = (api_url, input_language) => {
  if (!is_valid_input_language(api_url, input_language)) return []

  for (let lang of memory_cache[api_url].cached_data) {
    if (lang.code === input_language) return lang.targets
  }
  return []
}

// ----------------------------------------------------------------------------- validation

const is_valid_input_language = (api_url, input_language) => {
  const input_languages = memory_cache[api_url].input_languages

  return input_languages && (input_languages.indexOf(input_language) !== -1)
}

const is_valid_output_language = (api_url, input_language, output_language) => {
  const output_languages = get_output_languages(api_url, input_language)

  return output_languages && (output_languages.indexOf(output_language) !== -1)
}

// -----------------------------------------------------------------------------

module.exports = {
  init,  // returns a promise: library is ready to use once resolved
  get_input_languages,
  get_output_languages,
  is_valid_input_language,
  is_valid_output_language
}
