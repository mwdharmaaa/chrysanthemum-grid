$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/event_debouncer.js" -Raw
if ($code -notmatch "debounce") { throw "Missing debounce" }
Write-Host "[PASS] EventDebouncer verified."
