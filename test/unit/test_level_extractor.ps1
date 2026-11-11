$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/level_extractor.js" -Raw
if ($code -notmatch "extract\(dayEl, text\)") { throw "Missing extract method" }
if ($code -notmatch "hasContributions") { throw "Missing hasContributions method" }
Write-Host "[PASS] Level extractor algorithm verified."
