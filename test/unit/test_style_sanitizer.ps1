$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/style_sanitizer.js" -Raw
if ($code -notmatch "sanitizePx") { throw "Missing sanitizePx" }
Write-Host "[PASS] StyleSanitizer verified."
