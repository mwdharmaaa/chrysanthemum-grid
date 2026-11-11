$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/host_element.js" -Raw
if ($code -notmatch "cgg-winged-tooltip") { throw "Missing base class" }
if ($code -notmatch "cgg-crimson-halo") { throw "Missing crimson halo slot" }
if ($code -notmatch "cgg-winged-tooltip-wing-left") { throw "Missing left wing slot" }
if ($code -notmatch "cgg-winged-tooltip-wing-right") { throw "Missing right wing slot" }
Write-Host "[PASS] Host element DOM template verified."
