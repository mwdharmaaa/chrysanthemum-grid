$ErrorActionPreference = "Stop"

Write-Host "========================================"
Write-Host "[*] Chrysanthemum Gold Grid - Dev Runner"
Write-Host "========================================"

$extPath = $PSScriptRoot
$chromeBin = "C:\Program Files\Google\Chrome\Application\chrome.exe"

if (-not (Test-Path $chromeBin)) {
    $chromeBin = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

if (-not (Test-Path $chromeBin)) {
    Write-Error "[x] Google Chrome binary not found."
    exit 1
}

$devProfile = Join-Path $env:TEMP "chrome-cgg-dev"
if (-not (Test-Path $devProfile)) {
    New-Item -ItemType Directory -Force -Path $devProfile | Out-Null
}

$testPageUri = "file:///" + (Join-Path $extPath "test/test_page.html" -Resolve).Replace("\", "/")

Write-Host "[*] Extension Path : $extPath"
Write-Host "[*] Target Harness : $testPageUri"
Write-Host "[*] Launching Chrome in isolated profile..."

$chromeArgs = @(
    "--load-extension=$extPath",
    "--user-data-dir=$devProfile",
    $testPageUri
)

Start-Process -FilePath $chromeBin -ArgumentList $chromeArgs
Write-Host "[OK] Chrome dispatched with active Chrysanthemum Gold extension."
