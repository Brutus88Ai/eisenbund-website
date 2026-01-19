@echo off
echo ==========================================
echo   EISENBUND SHOP AUTH UPDATE (GOOGLE)
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging All Updates (Images, Auth, Code)...
git add .
git commit -m "Feat: Google Auth Simulation + Shop Updates"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Google Simulation ist aktiv.
echo   (Seite Refresh)
echo ==========================================
pause
