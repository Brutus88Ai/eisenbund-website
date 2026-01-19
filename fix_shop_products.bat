@echo off
echo ==========================================
echo   EISENBUND SHOP PRODUCT UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Adding new product images...
git add .
git commit -m "Feat: New Products (Mugs, Keychain)"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Neue Produkte sind live.
echo ==========================================
pause
