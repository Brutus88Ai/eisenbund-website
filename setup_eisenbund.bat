@echo off
title EISENBUND SYSTEM TERMINAL
color 0c

echo.
echo  ==============================================
echo   EISENBUND SYSTEM INITIALIZATION PROTOCOL
echo  ==============================================
echo.

echo [PROCESS] SCANNING DIRECTORY...
if not exist "node_modules" (
    echo [ACTION] INSTALLING NEURAL DEPENDENCIES...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] INSTALLATION FAILED.
        pause
        exit /b
    )
) else (
    echo [INFO] DEPENDENCIES DETECTED.
)

echo.
echo [PROCESS] COMPILING REACT CORE...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] BUILD FAILED.
    pause
    exit /b
)

echo.
echo [SUCCESS] SYSTEM ONLINE.
echo [ACTION] LAUNCHING INTERFACE...
call npm run dev
pause
