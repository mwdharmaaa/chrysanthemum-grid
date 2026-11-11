$ErrorActionPreference = "Stop"
$code = Get-Content "src/features/tooltip/event_delegator.js" -Raw
if ($code -notmatch "bindGlobal") { throw "Missing bindGlobal method" }
if ($code -notmatch "ContributionCalendar-day") { throw "Missing calendar selector" }
Write-Host "[PASS] Event delegator selectors verified."
