@echo off
echo ==========================================
echo   EISENBUND LOGO UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Adding New Logo...
git add .
git commit -m "Update: New Start Page Logo"

echo [2/2] Upload to GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Neues Logo ist jetzt online.
echo ==========================================
pause
