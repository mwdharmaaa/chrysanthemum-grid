$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/asset_resolver.js" -Raw
if ($code -notmatch "TooltipAssetResolver") { throw "Missing TooltipAssetResolver" }
if ($code -notmatch "resolve\(filename\)") { throw "Missing resolve method" }
if ($code -notmatch "runtime\?\.id") { throw "Missing runtime.id guard" }
Write-Host "[PASS] Asset resolver structure verified."
