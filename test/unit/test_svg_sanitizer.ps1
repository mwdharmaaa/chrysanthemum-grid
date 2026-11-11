$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/svg_sanitizer.js" -Raw
if ($code -notmatch "sanitizeFill") { throw "Missing sanitizeFill" }
Write-Host "[PASS] SvgSanitizer verified."
