@echo off

set DIR=%~dp0.

rem :: declare variables "LIBRE_TRANSLATE_API_KEY" and "LIBRE_TRANSLATE_API_URL"
call "%DIR%\..\LIBRE_TRANSLATE_API_CREDENTIALS.bat"

goto :start

:libre-translate
  call node "%DIR%\..\..\bin\libre-translate.js" %*
  goto :eof

:start
set output_dir=%DIR%\output
set log_file="%output_dir%\test.log"

if not exist "%output_dir%" mkdir "%output_dir%"
if exist %log_file% del %log_file%

call :libre-translate -i "en" -o "de" -s "Hello world"            >>%log_file% 2>&1
call :libre-translate -i "en" -o "de" -s "Welcome to the jungle"  >>%log_file% 2>&1
