@echo off
echo ==========================================
echo   EISENBUND FINAL FIX ("Der Bund" Update)
echo ==========================================
cd /d "%~dp0"

echo [1/4] Kopiere Videos nochmal zur Sicherheit...
if not exist "public\assets" mkdir "public\assets"
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\schmiede.mp4" "public\assets\schmiede.mp4*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\Industrial_AI_Cathedral_Symphony.mp4" "public\assets\cathedral.mp4*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\Industrial_Night_Sparks_Video.mp4" "public\assets\sparks.mp4*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\Sp.png" "public\assets\sp.png*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\logo (2).png" "public\assets\logo.png*" /Y
xcopy "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_1768760273231.jpg" "public\assets\haertegrad.jpg*" /Y

echo.
echo [2/4] Upload Code & Assets...
git add .
git commit -m "Final Fix: Add Video to IDCardGenerator and update assets"
git push origin main

echo.
echo [3/4] Raeume auf...
if exist fix_assets_v3.bat del fix_assets_v3.bat
if exist push_updates.bat del push_updates.bat

echo.
echo ==========================================
echo   FERTIG!
echo   WICHTIG: Warte 2 Minuten und druecke
echo   dann auf der Website STRG + F5 !!!
echo ==========================================
pause
