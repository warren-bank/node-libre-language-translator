const process_argv = require('@warren-bank/node-process-argv')

const argv_flags = {
  "--help":             {bool: true},
  "--version":          {bool: true},
  "--api-key":          {},
  "--api-url":          {},
  "--input-language":   {},
  "--output-language":  {},
  "--input-string":     {}
}

const argv_flag_aliases = {
  "--help":             ["-h"],
  "--version":          ["-v"],
  "--api-key":          ["-k"],
  "--api-url":          ["-u"],
  "--input-language":   ["-i"],
  "--output-language":  ["-o"],
  "--input-string":     ["-s"]
}

let argv_vals = {}
try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

argv_vals["--api-key"] = argv_vals["--api-key"] || process.env["LIBRE_TRANSLATE_API_KEY"]
argv_vals["--api-url"] = argv_vals["--api-url"] || process.env["LIBRE_TRANSLATE_API_URL"]

if (!argv_vals["--api-key"]) {
  argv_vals["--api-key"] = null
}

if (!argv_vals["--api-url"]) {
  argv_vals["--api-url"] = 'https://libretranslate.com'
}

if (!argv_vals["--input-language"]) {
  console.log('ERROR: Language code for input string is required')
  process.exit(1)
}

if (!argv_vals["--output-language"]) {
  console.log('ERROR: Language code for translated output string is required')
  process.exit(1)
}

if (!argv_vals["--input-string"]) {
  console.log('ERROR: Input string to be translated is required')
  process.exit(1)
}

module.exports = argv_vals
