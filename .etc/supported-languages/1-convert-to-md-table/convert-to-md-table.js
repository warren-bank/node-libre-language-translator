const request = require('../../../lib/libre-language-translator/request')

request('https://libretranslate.com/languages')
.catch(e => {
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
})
.then(data => {
  if (!Array.isArray(data) || !data.length) {
    console.log('API response is not valid:' + "\n" + JSON.stringify(data, null, 2))
    process.exit(2)
  }

  sort_api_data(data)
  format_api_data(data)
})

const sort_api_data = (data) => {
  data.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

const format_api_data = (data) => {
  // 1st pass
  const col_widths = [0, 0]
  for (let lang of data) {
    if (lang.code.length > col_widths[0]) col_widths[0] = lang.code.length
    if (lang.name.length > col_widths[1]) col_widths[1] = lang.name.length
  }

  // 2nd pass
  const md = []
  md.push(`| ${add_right_padding('code', col_widths[0] + 2)} | ${add_right_padding('name', col_widths[1])} |`)
  md.push(`|${('-').repeat(col_widths[0] + 4)}|${('-').repeat(col_widths[1] + 2)}|`)
  md.push(
    ...data.map(lang => `| ${add_right_padding('"' + lang.code + '"', col_widths[0] + 2)} | ${add_right_padding(lang.name, col_widths[1])} |`)
  )

  // print
  console.log(
    md.join("\n")
  )
}

const add_right_padding = (text, width) => {
  const pad_width = width - text.length
  return text + (' ').repeat(pad_width)
}
