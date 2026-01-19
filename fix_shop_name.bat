@echo off
echo ==========================================
echo   EISENBUND RENAMING UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Updates...
git add .
git commit -m "Refactor: Renamed Zeughaus to Merch Shop"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   NAME GEAENDERT!
echo ==========================================
pause
