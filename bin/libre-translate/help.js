const help = `
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
`

module.exports = help
