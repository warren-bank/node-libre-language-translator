#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
source "${DIR}/../LIBRE_TRANSLATE_API_CREDENTIALS.sh"

function libre-translate {
  node "${DIR}/../../bin/libre-translate.js" "$@"
}

output_dir="${DIR}/output"
log_file="${output_dir}/test.log"

[ ! -d "$output_dir" ] && mkdir "$output_dir"
[ -f "$log_file" ]     && rm    "$log_file"

libre-translate -i 'en' -o 'de' -s 'Hello world'            >>"$log_file" 2>&1
libre-translate -i 'en' -o 'de' -s 'Welcome to the jungle'  >>"$log_file" 2>&1
