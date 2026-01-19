@echo off
echo ==========================================
echo   EISENBUND FINAL DEPLOY ALL
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging changes (Logo Video, Cleaning ID Card, Imports)...
git add .
git commit -m "Update: Replace Logo with Video, Remove ID Generator"

echo [2/2] Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo   FERTIG!
echo   Alle Updates sind unterwegs.
echo   - Startseite: animiertes Logo
echo   - Der Bund: ID Card entfernt, nur Socials + Impressum
echo ==========================================
pause
