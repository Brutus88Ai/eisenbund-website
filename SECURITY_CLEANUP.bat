@echo off
chcp 65001 >nul
echo ========================================
echo   EISENBUND SECURITY CLEANUP SCRIPT
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Loesche dist/ Ordner...
if exist "dist" (
    rmdir /s /q "dist"
    echo      OK: dist/ geloescht!
) else (
    echo      SKIP: dist/ existiert nicht
)

echo.
echo [2/5] Entferne dist/ aus Git-Tracking...
git rm -r --cached dist 2>nul
if %errorlevel%==0 (
    echo      OK: Git-Cache bereinigt!
) else (
    echo      SKIP: dist/ war nicht im Git-Cache
)

echo.
echo [3/5] Stage alle Aenderungen...
git add -A
echo      OK: Alle Dateien gestaged!

echo.
echo [4/5] Erstelle Commit...
git commit -m "security: remove dist/ with exposed API key, add 7 skills, fix .gitignore"
echo      OK: Commit erstellt!

echo.
echo [5/5] Push zu GitHub...
git push origin main
echo      OK: Push abgeschlossen!

echo.
echo ========================================
echo   FERTIG! Vercel Deployment startet automatisch.
echo ========================================
echo.
echo NAECHSTER SCHRITT: API-Key in Firebase Console rotieren!
echo.
