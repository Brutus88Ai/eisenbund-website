@echo off
echo ==========================================
echo   EISENBUND LOGO-VIDEO UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Adding Logo Video...
git add .
git commit -m "Update: Replaced Start Page Logo with Video"

echo [2/2] Upload to GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Das Video-Logo ist jetzt aktiv.
echo ==========================================
pause
