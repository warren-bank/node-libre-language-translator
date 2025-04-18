#! /usr/bin/env node

const argv_vals     = require('./libre-translate/process_argv')
const translate_cli = require('../lib/libre-language-translator-cli/process_cli')

translate_cli(argv_vals)
.then(() => {
  process.exit(0)
})
.catch((e) => {
  console.log(e.message)
  process.exit(1)
})
