$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/dom_safe_query.js" -Raw
if ($code -notmatch "safeSelect") { throw "Missing safeSelect" }
Write-Host "[PASS] DomSafeQuery verified."
