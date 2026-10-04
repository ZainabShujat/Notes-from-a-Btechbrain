$content = Get-Content 'lib\courses\os-data.ts' -Raw

# Inspect resources sections across the file
$regex = [regex]'type:\s*"resources",\s*heading:[^,]+,\s*sources:\s*\[([\s\S]*?)\]\s*,\s*stillStuck:'
$matches = $regex.Matches($content)
Write-Output "Found $($matches.Count) resources sections"

for ($i = 0; $i -lt $matches.Count; $i++) {
    Write-Output "=== SECTION $i ==="
    $srcText = $matches[$i].Groups[1].Value
    # Find all url: "..." in this section
    $urlMatches = [regex]::Matches($srcText, 'title:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"')
    foreach ($u in $urlMatches) {
        Write-Output "  * $($u.Groups[1].Value) -> $($u.Groups[2].Value)"
    }
}
