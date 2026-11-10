@echo off
title Tejasswi Unisex Salon - Production Preview
echo ========================================================
echo   TEJASSWI UNISEX SALON - PRODUCTION BUILD PREVIEW
echo ========================================================
echo.
cd /d "%~dp0"

echo Starting production preview server...
start "" "http://localhost:4173"
call npm run preview
pause
