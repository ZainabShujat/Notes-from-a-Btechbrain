$content = Get-Content 'lib\courses\os-data.ts' -Raw
$matches = [regex]::Matches($content, 'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"')
foreach ($m in $matches) {
    Write-Output "$($m.Groups[1].Value) | $($m.Groups[2].Value) | $($m.Groups[3].Value)"
}
