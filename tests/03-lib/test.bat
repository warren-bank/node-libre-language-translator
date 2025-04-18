@echo off

set DIR=%~dp0.

rem :: declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
call "%DIR%\..\LIBRE_TRANSLATE_API_CREDENTIALS.bat"

set output_dir=%DIR%\output
set log_file="%output_dir%\test.log"

if not exist "%output_dir%" mkdir "%output_dir%"
if exist %log_file% del %log_file%

node "%DIR%\app\test.js" >%log_file% 2>&1
