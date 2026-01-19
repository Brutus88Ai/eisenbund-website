@echo off
echo ==========================================
echo   EISENBUND LEGAL UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Adding Legal Section...
git add .
git commit -m "Add: Impressum & Datenschutz to IDCardGenerator"

echo [2/2] Upload to GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Impressum ist jetzt unter 'Der Bund' sichtbar (unten aufklappbar).
echo ==========================================
pause
