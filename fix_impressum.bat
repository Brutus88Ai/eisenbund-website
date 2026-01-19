@echo off
echo ==========================================
echo   EISENBUND IMPRESSUM UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Updating Impressum...
git add .
git commit -m "Update: Impressum Address (Gegenwind Records)"

echo [2/2] Upload to GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Adressdaten wurden aktualisiert.
echo ==========================================
pause
