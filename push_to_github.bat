@echo off
chcp 65001 >nul
echo ===============================
echo   EISENBUND - GitHub Push
echo ===============================
echo.
cd /d "%~dp0"

echo [1/3] Adding GitHub Remote...
git remote add origin https://github.com/Brutus88Ai/eisenbund-website.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating URL...
    git remote set-url origin https://github.com/Brutus88Ai/eisenbund-website.git
)

echo [2/3] Staging all files...
git add .

echo [3/3] Committing and pushing to GitHub...
git commit -m "Initial Eisenbund Website Deployment"
git branch -M main
git push -u origin main

echo.
echo ===============================
echo   Push Complete!
echo ===============================
echo.
echo Repository: https://github.com/Brutus88Ai/eisenbund-website
echo.
pause
