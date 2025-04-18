@echo off

set DIR=%~dp0.

set output_dir=%DIR%\output
set log_file="%output_dir%\test.log"

if not exist "%output_dir%" mkdir "%output_dir%"
if exist %log_file% del %log_file%

node "%DIR%\app\test.js" >%log_file% 2>&1
