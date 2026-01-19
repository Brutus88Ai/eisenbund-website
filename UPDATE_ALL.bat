@echo off
echo ==========================================
echo   EISENBUND FINAL FIX (RETRY)
echo ==========================================
cd /d "%~dp0"

echo [1/4] Forcing Assets Update...
echo %date% %time% > force_deploy.txt
git add force_deploy.txt

echo [2/4] Adding Images explicitly...
git add "public/assets/shop/mug_wrench.jpg"
git add "public/assets/shop/mug_black.png"
git add "public/assets/shop/keychain_metal.jpg"

echo [3/4] Staging EVERYTHING else...
git add .
git commit -m "Fix: Force Rebuild & Add Missing Images [%date% %time%]"

echo [4/4] Push to Live...
git push origin main

echo.
echo ==========================================
echo   UPLOAD COMPLETE.
echo   Warte ca. 1-2 Minuten auf Vercel Build.
echo ==========================================
pause
