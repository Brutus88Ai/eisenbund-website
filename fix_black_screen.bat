@echo off
echo ==========================================
echo   EISENBUND BUG FIX (BLACK SCREEN)
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Fix...
git add src/context/AuthContext.jsx
git commit -m "Fix: Missing Google Auth function caused crash"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FIX DEPLOYED!
echo   Seite bitte neu laden (STRG + F5).
echo ==========================================
pause
