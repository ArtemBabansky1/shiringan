@echo off
echo === Sharingan Backend Setup ===

REM 1. Создать Laravel проект рядом и перенести файлы
echo Создаю Laravel проект...
composer create-project laravel/laravel laravel-temp --prefer-dist --no-interaction

REM 2. Скопировать фреймворк в текущую папку
xcopy /E /Y laravel-temp\* .
rmdir /S /Q laravel-temp

REM 3. Установить Sanctum
echo Устанавливаю Sanctum...
composer require laravel/sanctum

REM 4. Создать .env
copy .env.example .env
php artisan key:generate

echo.
echo === Настрой .env (база данных) и запусти: ===
echo php artisan migrate
echo php artisan serve
echo.
pause
