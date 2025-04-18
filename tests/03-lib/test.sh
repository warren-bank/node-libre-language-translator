#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
source "${DIR}/../LIBRE_TRANSLATE_API_CREDENTIALS.sh"

output_dir="${DIR}/output"
log_file="${output_dir}/test.log"

[ ! -d "$output_dir" ] && mkdir "$output_dir"
[ -f "$log_file" ]     && rm    "$log_file"

node "${DIR}/app/test.js" >"$log_file" 2>&1
