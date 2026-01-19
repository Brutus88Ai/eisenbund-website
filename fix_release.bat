@echo off
echo ==========================================
echo   EISENBUND FINAL RELEASE FIX
echo ==========================================
cd /d "%~dp0"

echo [1/3] Checking Video Logo...
if exist "public\assets\logo_video.mp4" (
    echo - Video Logo gefunden: OK
) else (
    echo - WARNUNG: Video Logo fehlt!
    echo   Kopiere Backup...
    copy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\grok-video-4a046914-0351-49d3-ba8c-b0d4fc4b016c.mp4" "public\assets\logo_video.mp4"
)

echo [2/3] Staging App Fixes (Shop, ID Crash, Logo)...
git add .
git commit -m "Fix: Shop Page, ID Crash, Logo Video"

echo [3/3] Uploading release...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite in 2 Minuten neu (STRG + F5).
echo   Deine Fixes sind live.
echo ==========================================
pause
