@echo off
echo ==========================================
echo   EISENBUND IMAGE FIX (FINAL)
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Images...
git add public/assets/shop/*
git commit -m "Fix: Ensure shop images are uploaded correctly"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   BILDER REPARIERT!
echo   Bitte Seite neu laden.
echo ==========================================
pause
