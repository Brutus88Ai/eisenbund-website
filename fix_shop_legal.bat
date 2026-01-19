@echo off
echo ==========================================
echo   EISENBUND LEGAL DOCS UPDATE
echo ==========================================
cd /d "%~dp0"

echo [1/2] Staging Code...
git add src/components/ShopLegal.jsx src/components/Shop.jsx
git commit -m "Feat: Checkout - Guest/Account, Shop - Legal Docs (AGB, Widerruf, Datenschutz)"

echo [2/2] Uploading...
git push origin main

echo.
echo ==========================================
echo   RECHTLICHES INTEGRIERT!
echo   AGB / Widerruf / Datenschutz im Footer.
echo ==========================================
pause
