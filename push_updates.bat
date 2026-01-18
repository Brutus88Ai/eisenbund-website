@echo off
echo Pushing visual updates...
cd /d "%~dp0"
git add .
git commit -m "Update: Enhance video visibility and UI"
git push origin main
echo DONE
