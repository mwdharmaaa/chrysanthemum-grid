$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/wing_animator.js" -Raw
if ($code -notmatch "cgg-anim-flutter") { throw "Missing flutter class" }
Write-Host "[PASS] WingAnimator verified."
