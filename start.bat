@echo off
chcp 65001 >nul
title Sharingan 100 Days

echo.
echo  ╔══════════════════════════════════╗
echo  ║     SHARINGAN — 100 DAYS         ║
echo  ╚══════════════════════════════════╝
echo.

cd /d "%~dp0"

rem Сбросить переменную VS Code которая мешает Electron
set ELECTRON_RUN_AS_NODE=

if not exist "node_modules" (
    echo  [1/2] Установка зависимостей (первый запуск)...
    call npm install
    if errorlevel 1 (
        echo  [ОШИБКА] npm install завершился с ошибкой.
        pause
        exit /b 1
    )
)

echo  [2/2] Запуск приложения...
echo.
call npm run electron:dev
pause
