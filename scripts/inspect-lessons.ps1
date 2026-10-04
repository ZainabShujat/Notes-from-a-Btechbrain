$content = Get-Content 'lib\courses\os-data.ts'
for ($i = 0; $i -lt $content.Length; $i++) {
    $line = $content[$i]
    if ($line -match 'title:\s*"Module' -or $line -match '^\s*slug:\s*"' -or $line -match 'cheatSheetDownloadSlug:') {
        Write-Output "$($i + 1): $($line.Trim())"
    }
}
