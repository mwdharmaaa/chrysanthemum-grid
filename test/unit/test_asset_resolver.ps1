$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/asset_resolver.js" -Raw
if ($code -notmatch "TooltipAssetResolver") { throw "Missing TooltipAssetResolver" }
if ($code -notmatch "resolve\(filename\)") { throw "Missing resolve method" }
Write-Host "[PASS] Asset resolver structure verified."
