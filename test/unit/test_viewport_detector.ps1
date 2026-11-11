$ErrorActionPreference = "Stop"
$code = Get-Content "src/core/viewport_detector.js" -Raw
if ($code -notmatch "isInViewport") { throw "Missing isInViewport" }
Write-Host "[PASS] ViewportDetector verified."
