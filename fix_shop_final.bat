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
    copy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\grok-video-4a046914-0351-49d3-ba8c-b0d4fc4b016c.mp4" "public\assets\logo_video.mp4"
)

if exist "public\assets\shop_bg.mp4" (
    echo - Shop Video OK
) else (
    echo - Shop Video FEHLT! Kopiere Backup...
    copy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\grok-video-c9c7007d-7311-4e0e-9c64-7710d64eac1f.mp4" "public\assets\shop_bg.mp4"
)

echo [2/3] Adding Shop Video & Fixes...
git add .
git commit -m "Feature: Shop Video Background & Final Fixes"

echo [3/3] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Lade die Seite in 2 Minuten neu (STRG + F5).
echo   Startseite: Video-Logo
echo   Shop: Video-Hintergrund
echo   Der Bund: Repariert
echo ==========================================
pause
