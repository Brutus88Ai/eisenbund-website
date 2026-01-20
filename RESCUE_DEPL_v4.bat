@echo off
setlocal
echo ============================================================
echo   EISENBUND: LEAD DEVELOPER RESCUE PROTOCOL (v4.0)
echo ============================================================
cd /d "%~dp0"

echo [1/5] PRÜFE UMGEBUNG...
where git >nul 2>&1
if %errorlevel% neq 0 (echo ERROR: Git nicht gefunden! & pause & exit /b)
where npm >nul 2>&1
if %errorlevel% neq 0 (echo ERROR: NPM nicht gefunden! & pause & exit /b)

echo [2/5] BEREINIGE SYSTEM SPERREN...
taskkill /F /IM git.exe /T 2>nul
del .git\index.lock 2>nul

echo [3/5] INSTALLIERE FIREBASE NACH...
call npm install firebase --no-fund --no-audit

echo [4/5] ERZWINGE GIT SYNC (v4.0)...
git add .
git commit -m "Lead Dev Fix: v4.0 Final Firebase Implementation"
echo VERSUCHE PUSH ZU MAIN...
git push origin main --force

echo [5/5] ABSCHLUSS...
echo.
echo ============================================================
echo   PROTOKOLL BEENDET.
echo   Warte 2 Minuten und lade die Seite.
echo   Du musst "SYSTEM v4.0" im Login-Screen sehen.
echo ============================================================
pause
