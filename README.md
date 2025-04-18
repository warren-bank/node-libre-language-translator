### [libre-language-translator](https://github.com/warren-bank/node-libre-language-translator)

Unofficial Node.js client library and CLI for a subset of the [LibreTranslate&trade;](https://github.com/LibreTranslate/LibreTranslate) service API.

#### Installation:

```bash
npm install @warren-bank/libre-language-translator
```

- - - - -

#### Library API:

* translate(api_key, api_url, input_language_code, output_language_code, input_strings_array, optimize_duplicates)
  - input parameters:
    * api_key
      - type: string | `null`
      - optional: [LibreTranslate server](https://github.com/LibreTranslate/LibreTranslate#mirrors) API key
      - default: `null`
    * api_url
      - type: string
      - optional: [LibreTranslate server](https://github.com/LibreTranslate/LibreTranslate#mirrors) API URL
      - default: `https://libretranslate.com`
    * input_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-languages)
    * output_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-languages)
    * input_strings_array
      - type: array of strings
      - each string will be translated from `input_language_code` to `output_language_code`
      - the order of strings is preserved in the resolved return value
    * optimize_duplicates
      - type: boolean
      - default: false
      - when true:
        * duplicate strings are removed from the request to the translation service
        * translations for duplicate input strings are positionally inserted into the response from the translation service
          - the resolved value is identical to that of a non-optimized request
          - the benefit is that the translation service performs less work
  - return value:
    * Promise that resolves to an array of translated strings in the same order as the input array

#### Supported Languages

* a real-time JSON array of supported language objects is returned from the [API](https://libretranslate.com/docs) endpoint: [`/languages`](https://libretranslate.com/languages)
* the following table summarizes this response: <small>(last updated on 4/17/2025)</small>

| code      | name                  |
|-----------|-----------------------|
| "ar"      | Arabic                |
| "az"      | Azerbaijani           |
| "bg"      | Bulgarian             |
| "bn"      | Bengali               |
| "ca"      | Catalan               |
| "cs"      | Czech                 |
| "da"      | Danish                |
| "de"      | German                |
| "el"      | Greek                 |
| "en"      | English               |
| "eo"      | Esperanto             |
| "es"      | Spanish               |
| "et"      | Estonian              |
| "eu"      | Basque                |
| "fa"      | Persian               |
| "fi"      | Finnish               |
| "fr"      | French                |
| "ga"      | Irish                 |
| "gl"      | Galician              |
| "he"      | Hebrew                |
| "hi"      | Hindi                 |
| "hu"      | Hungarian             |
| "id"      | Indonesian            |
| "it"      | Italian               |
| "ja"      | Japanese              |
| "ko"      | Korean                |
| "lt"      | Lithuanian            |
| "lv"      | Latvian               |
| "ms"      | Malay                 |
| "nb"      | Norwegian             |
| "nl"      | Dutch                 |
| "pl"      | Polish                |
| "pt"      | Portuguese            |
| "pt-BR"   | Portuguese (Brazil)   |
| "ro"      | Romanian              |
| "ru"      | Russian               |
| "sk"      | Slovak                |
| "sl"      | Slovenian             |
| "sq"      | Albanian              |
| "sr"      | Serbian               |
| "sv"      | Swedish               |
| "th"      | Thai                  |
| "tl"      | Tagalog               |
| "tr"      | Turkish               |
| "uk"      | Ukrainian             |
| "ur"      | Urdu                  |
| "vi"      | Vietnamese            |
| "zh-Hans" | Chinese               |
| "zh-Hant" | Chinese (traditional) |

#### Library Examples:

* implicit optimization of duplicate input strings

```javascript
const {translate} = require('@warren-bank/libre-language-translator')

{
  const api_key              = null
  const api_url              = 'https://translate.flossboxin.org.in'
  const input_language_code  = 'en'
  const output_language_code = 'de'
  const input_strings_array  = ['Hello world', 'Welcome to the jungle', 'Hello world', 'Welcome to the jungle']
  const optimize_duplicates  = true

  const translated_strings_array = await translate(api_key, api_url, input_language_code, output_language_code, input_strings_array, optimize_duplicates)

  console.log(output_language_code)
  console.log(JSON.stringify(translated_strings_array, null, 2))
}
```

* explicit optimization of duplicate input strings

```javascript
const {translate}       = require('@warren-bank/libre-language-translator')
const {DuplicatesStore} = require('@warren-bank/libre-language-translator/lib/optimize-duplicates')

{
  const api_key             = null
  const api_url             = 'https://translate.flossboxin.org.in'
  const input_language_code = 'en'
  const input_strings_array = ['Hello world', 'Welcome to the jungle', 'Hello world', 'Welcome to the jungle']
  const optimize_duplicates = false

  const duplicates_store            = new DuplicatesStore(input_strings_array)
  const deduped_input_strings_array = duplicates_store.dehydrate_input_strings_array()
  const output_languages            = ['de', 'es', 'fr']

  for (const output_language_code of output_languages) {
    const deduped_translated_strings_array = await translate(
      api_key, api_url, input_language_code, output_language_code, deduped_input_strings_array, optimize_duplicates
    )
    const translated_strings_array = duplicates_store.rehydrate_translated_strings_array(deduped_translated_strings_array)

    console.log(output_language_code)
    console.log(JSON.stringify(translated_strings_array, null, 2))
  }
}
```

- - - - -

#### CLI Usage:

```bash
libre-translate <options>

options:
========
"-h"
"--help"
    Print a help message describing all command-line options.

"-v"
"--version"
    Display the version.

"-k" <key>
"--api-key" <key>
    [optional] LibreTranslate server API key.
    Fallback: Value of the "LIBRE_TRANSLATE_API_KEY" environment variable, if one exists.

"-u" <url>
"--api-url" <url>
    [optional] LibreTranslate server API URL.
    Fallback: Value of the "LIBRE_TRANSLATE_API_URL" environment variable, if one exists.
    Default: "https://libretranslate.com"

"-i" <language>
"--input-language" <language>
    [required] Language code for input string.

"-o" <language>
"--output-language" <language>
    [required] Language code for translated output string, written to stdout.

"-s" <text>
"--input-string" <text>
    [required] Input string to be translated.
```

#### CLI Example:

```bash
source ~/LIBRE_TRANSLATE_API_CREDENTIALS.sh

libre-translate -i 'en' -o 'de' -s 'Hello world'
libre-translate -i 'en' -o 'de' -s 'Welcome to the jungle'
```

- - - - -

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
