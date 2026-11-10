@echo off
title Tejasswi Unisex Salon - Web App Launcher
echo ========================================================
echo   TEJASSWI UNISEX SALON (PROP. PANKAJ THAKUR)
echo   Local Web Application Launcher
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/3] Checking Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not detected on this computer.
    echo Please download and install Node.js from https://nodejs.org/ (LTS version)
    echo.
    pause
    exit /b
)

echo [2/3] Checking dependencies...
if not exist "node_modules" (
    echo node_modules not found. Running npm install...
    call npm install
)

echo [3/3] Starting development server...
echo The website will open in your browser shortly at http://localhost:5173
echo Press Ctrl + C to stop the server anytime.
echo.

start "" "http://localhost:5173"
call npm run dev
pause
