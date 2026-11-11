$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/styler/container_styler.js" -Raw
if ($code -notmatch "ContainerStyler") { throw "Missing ContainerStyler" }
if ($code -notmatch "style\(container") { throw "Missing style method" }
if ($code -notmatch "injectBadge") { throw "Missing injectBadge method" }
Write-Host "[PASS] ContainerStyler verified."
