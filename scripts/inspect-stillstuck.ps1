$content = Get-Content 'lib\courses\os-data.ts' -Raw

# Inspect stillStuck sections across the file
$regex = [regex]'stillStuck:\s*\[([\s\S]*?)\]\s*\}\s*(\]|\})'
$matches = $regex.Matches($content)
Write-Output "Found $($matches.Count) stillStuck sections"

for ($i = 0; $i -lt $matches.Count; $i++) {
    Write-Output "=== STILL STUCK SECTION $i ==="
    $text = $matches[$i].Groups[1].Value
    $items = [regex]::Matches($text, 'title:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"')
    foreach ($item in $items) {
        Write-Output "  * $($item.Groups[1].Value) -> $($item.Groups[2].Value)"
    }
}
