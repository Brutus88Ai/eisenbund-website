@echo off
echo ==========================================
echo   EISENBUND SPOTIFY UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Adding Autoplay Config...
git add .
git commit -m "Update: Try Enabling Spotify Autoplay"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite neu (STRG + F5).
echo   Hinweis: Wenn Autoplay nicht startet,
echo   blockiert der Browser Audio (Normalfall).
echo ==========================================
pause
