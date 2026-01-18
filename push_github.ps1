# Eisenbund GitHub Push Script
# Run this in PowerShell

Set-Location "c:\Users\pasca\Desktop\Eisenbund Website"

Write-Host "=== EISENBUND GitHub Push ===" -ForegroundColor Cyan

# Add remote
git remote add origin https://github.com/Brutus88Ai/eisenbund-website.git 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote set-url origin https://github.com/Brutus88Ai/eisenbund-website.git
}

# Stage all files
git add .

# Commit
git commit -m "Initial Eisenbund Website deployment"

# Push
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "=== PUSH COMPLETE ===" -ForegroundColor Green
Write-Host "Repo: https://github.com/Brutus88Ai/eisenbund-website" -ForegroundColor Yellow
