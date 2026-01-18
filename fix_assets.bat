@echo off
echo ==========================================
echo   EISENBUND ASSET REPAIR & PUSH
echo ==========================================

cd /d "%~dp0"

echo [1/5] Erstelle Ordnerstruktur...
if not exist "public\assets" mkdir "public\assets"

echo [2/5] Kopiere Mediendateien...
copy "..\fotosvideos\schmiede.mp4" "public\assets\schmiede.mp4"
copy "..\fotosvideos\Industrial_AI_Cathedral_Symphony.mp4" "public\assets\cathedral.mp4"
copy "..\fotosvideos\Industrial_Night_Sparks_Video.mp4" "public\assets\sparks.mp4"
copy "..\fotosvideos\Sp.png" "public\assets\sp.png"
copy "..\fotosvideos\logo (2).png" "public\assets\logo.png"

echo [2.5/5] Kopiere Haertegrad Cover...
copy "C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3\uploaded_image_1768760273231.jpg" "public\assets\haertegrad.jpg"

echo [3/5] Bereinige .gitignore...
type .gitignore | findstr /v ".mp4" > .gitignore.tmp
move /y .gitignore.tmp .gitignore

echo [4/5] Git Add & Commit...
git add public/assets/ -f
git add .
git commit -m "Fix: Add missing assets and media files"

echo [5/5] Upload zu GitHub...
git push origin main

echo.
echo ==========================================
echo.
echo ==========================================
echo   FERTIG! Bitte Fenster schliessen.
echo ==========================================
pause

