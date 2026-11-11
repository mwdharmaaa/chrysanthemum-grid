$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/halo_renderer.js" -Raw
if ($code -notmatch "cgg-crimson-halo") { throw "Missing halo class" }
Write-Host "[PASS] HaloRenderer verified."
