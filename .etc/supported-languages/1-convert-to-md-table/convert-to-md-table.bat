@echo off

set output_path="%~dp0.\supported-languages.md"

call node "%~dpn0.js" >%output_path% 2>&1
