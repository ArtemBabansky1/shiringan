@echo off
chcp 65001 >nul
title Создание ярлыка Sharingan
echo.
echo  Создаю ярлык на рабочем столе...
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\create-shortcut.ps1"
pause
