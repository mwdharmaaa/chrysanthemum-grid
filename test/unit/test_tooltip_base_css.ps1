$ErrorActionPreference = "Stop"
$code = Get-Content "src/styles/tooltip/base.css" -Raw
if ($code -notmatch "is-active") { throw "Missing is-active rule" }
Write-Host "[PASS] Base tooltip CSS verified."
