@echo off
echo ==========================================
echo   EISENBUND NAVIGATION UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Updates...
git add src/components/Navigation.jsx
git commit -m "Feat: Rename Zeughaus to Merch Shop + Domain Redirect"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   NAVIGATION UPDATED!
echo   'Merch Shop' Button leitet jetzt auf
echo   eisenbund.shop weiter.
echo ==========================================
pause
