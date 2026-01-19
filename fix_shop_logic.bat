@echo off
echo ==========================================
echo   EISENBUND SHOP LOGIC UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/3] Copying Missing Asset (Beanie Grey)...
copy /Y "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_1_1768810372313.jpg" "public\assets\shop\beanie_grey.jpg"

echo [2/3] Staging New Components & Logic...
git add .
git commit -m "Feat: Shopping Cart, Checkout, and Context Logic"

echo [3/3] Uploading...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Der Shop ist jetzt funktional.
echo   (STRG + F5 im Browser)
echo ==========================================
pause
