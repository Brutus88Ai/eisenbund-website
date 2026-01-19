@echo off
echo ==========================================
echo   EISENBUND FINAL RESCUE FIX
echo ==========================================
cd /d "%~dp0"

echo [1/3] Adding ALL shop assets (forced)...
git add -f public/assets/shop/*

echo [2/3] Patching Auth Logic...
git add src/context/AuthContext.jsx
git commit -m "Fix: Missing Images & Hardened Auth Logic"

echo [3/3] Uploading to Production...
git push origin main

echo.
echo ==========================================
echo   ALLES REPARIERT!
echo   1. Bilder sollten jetzt da sein.
echo   2. Login/Register Fehler behoben.
echo ==========================================
pause
