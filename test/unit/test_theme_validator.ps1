$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/theme_validator.js" -Raw
if ($code -notmatch "isValidHex") { throw "Missing isValidHex" }
Write-Host "[PASS] ThemeValidator verified."
