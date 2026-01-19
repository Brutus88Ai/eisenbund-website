@echo off
echo ==========================================
echo   EISENBUND FINAL UPDATE (FOR REAL)
echo ==========================================
cd /d "%~dp0"

echo [1/4] Ensuring Assets Exist...
python copy_images.py

echo [2/4] Forcing Rebuild...
echo %date% %time% > force_deploy_v2.txt
git add force_deploy_v2.txt

echo [3/4] Staging Assets...
git add public/assets/shop/mug_wrench.jpg
git add public/assets/shop/mug_black.png
git add public/assets/shop/keychain_metal.jpg
git add .

echo [4/4] Commit & Push...
git commit -m "Fix: Added missing shop images and forced rebuild"
git push origin main

echo.
echo ==========================================
echo   UPLOAD FERTIG.
echo   Bitte warten und Seite neu laden.
echo ==========================================
pause
