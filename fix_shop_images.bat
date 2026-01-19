@echo off
echo ==========================================
echo   EISENBUND SHOP IMAGE FIX
echo ==========================================
cd /d "%~dp0"

echo [1/3] Creating directory...
if not exist "public\assets\shop" mkdir "public\assets\shop"

echo [2/3] Copying Images...
copy /Y "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_0_1768810372313.jpg" "public\assets\shop\shirt_back.jpg"
copy /Y "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_2_1768810372313.jpg" "public\assets\shop\hoodie_rust.jpg"
copy /Y "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_3_1768810372313.jpg" "public\assets\shop\beanie_black.jpg"
copy /Y "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_4_1768810372313.jpg" "public\assets\shop\patch.jpg"

echo [3/3] Uploading...
git add .
git commit -m "Fix: Add missing shop images"
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Bilder sollten jetzt geladen werden.
echo   (STRG + F5 im Browser)
echo ==========================================
pause
