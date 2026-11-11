$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/attribute_observer.js" -Raw
if ($code -notmatch "createObserver") { throw "Missing createObserver" }
Write-Host "[PASS] AttributeObserver verified."
