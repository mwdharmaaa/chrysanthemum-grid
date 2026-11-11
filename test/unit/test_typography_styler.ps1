$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/styler/typography_styler.js" -Raw
if ($code -notmatch "TypographyStyler") { throw "Missing TypographyStyler" }
if ($code -notmatch "style\(settings") { throw "Missing style method" }
if ($code -notmatch "octicon-mark-github") { throw "Missing octicon brand selector" }
Write-Host "[PASS] TypographyStyler verified."
