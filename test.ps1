$ErrorActionPreference = "Stop"
Write-Host "========================================"
Write-Host "[*] Chrysanthemum Gold Grid - Integrity & Unit Suite"
Write-Host "========================================"

$baseDir = $PSScriptRoot

# Run all unit tests
$unitTests = Get-ChildItem -Path (Join-Path $baseDir "test/unit") -Filter "*.ps1"
foreach ($t in $unitTests) {
    Write-Host "[RUN] $($t.Name)..."
    & $t.FullName
}

Write-Host "========================================"
Write-Host "[PASS] All unit tests completed successfully."
Write-Host "========================================"
