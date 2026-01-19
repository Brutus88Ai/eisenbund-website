@echo off
echo ==========================================
echo   EISENBUND SHOP DESIGN UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Shop Design...
git add .
git commit -m "Update: New Shop Design (Red/Black)"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite neu (STRG + F5).
echo   Der Shop hat jetzt das neue Design.
echo ==========================================
pause
