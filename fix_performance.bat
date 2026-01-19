@echo off
echo ==========================================
echo   EISENBUND PERFORMANCE UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Performance Fixes...
git add .
git commit -m "Perf: Enable video preloading (preload=auto)"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite neu (STRG + F5).
echo   Videos sollten jetzt schneller starten.
echo ==========================================
pause
