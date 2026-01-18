@echo off
echo ==========================================
echo   EISENBUND ASSET REPAIR V3 (FINAL)
echo ==========================================
cd /d "%~dp0"

echo [1/5] Erstelle Zielordner...
if not exist "public\assets" mkdir "public\assets"

echo [2/5] Kopiere Videos aus "Eisenbund band"...
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\schmiede.mp4" "public\assets\schmiede.mp4*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\Industrial_AI_Cathedral_Symphony.mp4" "public\assets\cathedral.mp4*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\Industrial_Night_Sparks_Video.mp4" "public\assets\sparks.mp4*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\Sp.png" "public\assets\sp.png*" /Y
xcopy "C:\Users\pasca\Desktop\Eisenbund band\fotosvideos\logo (2).png" "public\assets\logo.png*" /Y

echo [3/5] Kopiere Haertegrad Cover...
xcopy "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_1768760273231.jpg" "public\assets\haertegrad.jpg*" /Y

echo [4/5] Upload zu GitHub...
git add public/assets/* -f
git add .
git commit -m "Fix: Add assets from correct path V3"
git push origin main

echo [5/5] Raeume alte Scripts auf...
del fix_assets.bat
del fix_assets_v2.bat
del push_github.ps1
del push_to_github.bat

echo.
echo ==========================================
echo.
echo ==========================================
echo   FERTIG! Alles repariert.
echo ==========================================
pause
