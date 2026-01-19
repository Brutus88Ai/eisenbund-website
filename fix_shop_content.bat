@echo off
echo ==========================================
echo   EISENBUND SHOP CONTENT UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Shop Content (Assets + Code)...
git add .
git commit -m "Update: Added product images and categories to Shop"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite neu (STRG + F5).
echo   Der Shop ist jetzt gefuellt.
echo ==========================================
pause
