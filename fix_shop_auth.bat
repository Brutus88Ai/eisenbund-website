@echo off
echo ==========================================
echo   EISENBUND SHOP AUTH UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Auth Features...
git add .
git commit -m "Feat: User Accounts (Login/Register/Profile)"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   User Accounts sind aktiv.
echo   (STRG + F5 im Browser)
echo ==========================================
pause
