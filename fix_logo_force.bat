@echo off
echo ==========================================
echo   EISENBUND LOGO FORCE FIX
echo ==========================================
cd /d "%~dp0"

echo [1/3] Deleting old logo video...
if exist "public\assets\logo_video.mp4" del "public\assets\logo_video.mp4"

echo [2/3] Copying NEW logo video (Force)...
copy /Y "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\grok-video-3eab7041-2174-47cd-b687-d616fadfe17a.mp4" "public\assets\logo_video.mp4"

echo [3/3] Uploading...
git add .
git commit -m "Fix: Force Update Logo Video (New Version)"
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite in 2 Minuten neu (STRG + F5).
echo ==========================================
pause
