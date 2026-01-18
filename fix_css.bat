@echo off
echo ==========================================
echo   EISENBUND VISUAL FIX (Video Sichtbarkeit)
echo ==========================================
cd /d "%~dp0"

echo [1/2] Update Code & CSS...
git add .
git commit -m "Fix: Video Positioning (Absolute vs Fixed)"

echo [2/2] Upload zu GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite neu (STRG + F5).
echo ==========================================
pause
