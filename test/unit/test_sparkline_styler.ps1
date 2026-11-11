$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/styler/sparkline_styler.js" -Raw
if ($code -notmatch "SparklineStyler") { throw "Missing SparklineStyler" }
if ($code -notmatch "--cgg-accent-primary") { throw "Missing accent primary token" }
Write-Host "[PASS] SparklineStyler verified."
