@echo off
echo ==========================================
echo   EISENBUND ASSET REPAIR V2
echo ==========================================

cd /d "%~dp0"

echo [1/3] Kopiere fehlende Videos (Absoluter Pfad)...
copy "C:\Users\pasca\Desktop\fotosvideos\schmiede.mp4" "public\assets\schmiede.mp4"
copy "C:\Users\pasca\Desktop\fotosvideos\Industrial_AI_Cathedral_Symphony.mp4" "public\assets\cathedral.mp4"
copy "C:\Users\pasca\Desktop\fotosvideos\Industrial_Night_Sparks_Video.mp4" "public\assets\sparks.mp4"
copy "C:\Users\pasca\Desktop\fotosvideos\Sp.png" "public\assets\sp.png"
copy "C:\Users\pasca\Desktop\fotosvideos\logo (2).png" "public\assets\logo.png"

echo [2/3] Speichere Dateien fuer GitHub...
git add public/assets/* -f
git commit -m "Fix: Add missing videos via absolute path copy"

echo [3/3] Upload zu GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG! Bitte Vercel pruefen.
echo ==========================================
pause
