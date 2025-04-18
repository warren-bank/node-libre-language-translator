const fs      = require('fs')
const path    = require('path')
const request = require('../request')

// -----------------------------------------------------------------------------common

const get_cachedir = () => {
  return path.join(__dirname, 'cache')
}

const get_api_url_file_extension = (api_url) => api_url.toLowerCase().replace(/[^a-z0-9]/g, '').substring(5,25)

const get_filepath = (api_url) => {
  // invalidate daily
  const timestamp = (new Date()).toISOString().split('T')[0]
  const filename  = `languages.${timestamp}.${get_api_url_file_extension(api_url)}.json`
  return path.join(get_cachedir(), filename)
}

// ----------------------------------------------------------------------------- update

const refresh_cache = async (api_url, filepath) => {
  if (fs.existsSync(filepath)) return

  clean_cache_directory(api_url)
  await download_cache_file(api_url, filepath)
}

const clean_cache_directory = (api_url) => {
  const cachedir = get_cachedir()
  const suffix = `.${get_api_url_file_extension(api_url)}.json`
  const files = fs.readdirSync(cachedir, {encoding: 'utf8', withFileTypes: false, recursive: false})
  for (let file of files) {
    if (file.endsWith(suffix)) {
      fs.rm(path.join(cachedir, file), {force: true}, (e) => {})
    }
  }
}

// returns a Promise
// can throw Error
const download_cache_file = (api_url, filepath) => {
  return request(api_url + '/languages')
  .catch(e => {
    throw e
  })
  .then(data => {
    fs.writeFileSync(filepath, JSON.stringify(data), {encoding: 'utf8'})
  })
}

// ----------------------------------------------------------------------------- read

// returns an array of language objects
// can throw Error
const read_cache = async (api_url) => {
  const filepath = get_filepath(api_url)
  await refresh_cache(api_url, filepath)
  const json = fs.readFileSync(filepath, {encoding: 'utf8'})
  return JSON.parse(json)
}

// -----------------------------------------------------------------------------

module.exports = {
  read_cache,
  get_filepath
}
