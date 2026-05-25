$rootDir = Split-Path -Parent $PSScriptRoot
$ws = New-Object -ComObject WScript.Shell
$desktop = [Environment]::GetFolderPath('Desktop')
$lnk = "$desktop\Sharingan 100 Days.lnk"

$shortcut = $ws.CreateShortcut($lnk)
$shortcut.TargetPath    = "$rootDir\start.bat"
$shortcut.WorkingDirectory = $rootDir
$shortcut.Description   = "Sharingan — 100 дней"
$shortcut.WindowStyle   = 7  # minimised — cmd убирается, Electron остаётся

$ico = "$rootDir\build\icon.ico"
if (Test-Path $ico) {
    $shortcut.IconLocation = $ico
}

$shortcut.Save()
Write-Host ""
Write-Host "  Ярлык создан: $lnk" -ForegroundColor Green
if (-not (Test-Path $ico)) {
    Write-Host ""
    Write-Host "  Иконка не найдена. Чтобы поставить иконку Sharingan:" -ForegroundColor Yellow
    Write-Host "  1. Открой build\icon.svg в браузере" -ForegroundColor Yellow
    Write-Host "  2. Сохрани как PNG 256x256" -ForegroundColor Yellow
    Write-Host "  3. Конвертируй в ICO (convertio.co)" -ForegroundColor Yellow
    Write-Host "  4. Сохрани как build\icon.ico" -ForegroundColor Yellow
    Write-Host "  5. Запусти этот скрипт снова" -ForegroundColor Yellow
}
Write-Host ""
