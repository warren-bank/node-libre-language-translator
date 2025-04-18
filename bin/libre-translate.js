#! /usr/bin/env node

(async () => {
  const argv_vals     = await require('./libre-translate/process_argv')()
  const translate_cli = require('../lib/libre-language-translator-cli/process_cli')

  try {
    await translate_cli(argv_vals)
    process.exit(0)
  }
  catch(e) {
    console.log(e.message)
    process.exit(1)
  }
})()
