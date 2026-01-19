@echo off
echo ==========================================
echo   EISENBUND SHOP & FINAL DEPLOY
echo ==========================================
cd /d "%~dp0"

echo [1/3] Checking Video Assets...
if exist "public\assets\logo_video.mp4" (
    echo - Logo Video OK
) else (
    echo - Logo Video FEHLT! Kopiere Backup...
    copy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\grok-video-3eab7041-2174-47cd-b687-d616fadfe17a.mp4" "public\assets\logo_video.mp4"
)

if exist "public\assets\shop_bg.mp4" (
    echo - Shop Video OK
) else (
    echo - Shop Video FEHLT! Kopiere Backup...
    copy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\grok-video-c9c7007d-7311-4e0e-9c64-7710d64eac1f.mp4" "public\assets\shop_bg.mp4"
)

echo [2/3] Adding Shop Video & Domain Logic...
git add .
git commit -m "Feature: Shop Video & Domain Routing Support"

echo [3/3] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   1. Startseite hat Video-Logo.
echo   2. Shop hat Video-Hintergrund.
echo   3. 'eisenbund.shop' Domain wird unterstuetzt (oeffnet Shop direkt).
echo.
echo   Bitte Seite neu laden (STRG + F5).
echo ==========================================
pause
