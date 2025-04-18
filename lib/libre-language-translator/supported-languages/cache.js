const fs      = require('fs')
const path    = require('path')
const request = require('../request')

// -----------------------------------------------------------------------------common

const get_cachedir = () => {
  return path.join(__dirname, 'cache')
}

const get_filepath = () => {
  // invalidate daily
  const timestamp = (new Date()).toISOString().split('T')[0]
  const filename  = `languages.${timestamp}.json`
  return path.join(get_cachedir(), filename)
}

// ----------------------------------------------------------------------------- update

const refresh_cache = async (filepath) => {
  if (fs.existsSync(filepath)) return

  clean_cache_directory()
  await download_cache_file(filepath)
}

const clean_cache_directory = () => {
  const cachedir = get_cachedir()
  const files = fs.readdirSync(cachedir, {encoding: 'utf8', withFileTypes: false, recursive: false})
  for (let file of files) {
    if (file.endsWith('.json')) {
      fs.rm(path.join(cachedir, file), {force: true}, (e) => {})
    }
  }
}

// returns a Promise
// can throw Error
const download_cache_file = (filepath) => {
  return request('https://libretranslate.com/languages')
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
const read_cache = async () => {
  const filepath = get_filepath()
  await refresh_cache(filepath)
  const json = fs.readFileSync(filepath, {encoding: 'utf8'})
  return JSON.parse(json)
}

// -----------------------------------------------------------------------------

module.exports = read_cache
