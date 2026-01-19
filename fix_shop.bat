@echo off
echo ==========================================
echo   EISENBUND MERCH UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Adding Merch Tab...
git add .
git commit -m "Add: Merch Shop Tab to Navigation"

echo [2/2] Upload to GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   'MERCH SHOP' Button ist jetzt sichtbar.
echo ==========================================
pause
