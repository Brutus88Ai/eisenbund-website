@echo off
echo ==========================================
echo   EISENBUND VISUALS UPDATE (FINAL)
echo ==========================================
cd /d "%~dp0"

echo [1/2] Update Produktion/Video & Manifest/Tabs...
git add .
git commit -m "Fix: Fullscreen Video Layout & Tabs Content"

echo [2/2] Upload zu GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite neu (STRG + F5).
echo ==========================================
pause
