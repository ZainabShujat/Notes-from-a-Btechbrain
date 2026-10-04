$content = Get-Content 'lib\courses\os-data.ts' -Raw

$slugs = @(
  "why-operating-systems-exist",
  "dual-mode-and-system-calls",
  "what-is-a-process",
  "process-states-and-transitions",
  "context-switching",
  "inter-process-communication",
  "scheduling-basics",
  "fcfs-and-round-robin",
  "sjf-srtf-priority-scheduling",
  "critical-section-and-semaphores",
  "deadlock-principles-and-bankers",
  "paging-and-tlb",
  "page-replacement-algorithms",
  "file-allocation-and-inodes",
  "disk-scheduling-algorithms"
)

for ($i = 0; $i -lt $slugs.Count; $i++) {
    $slug = $slugs[$i]
    $nextSlug = if ($i + 1 -lt $slugs.Count) { $slugs[$i+1] } else { "MODULE" }
    
    $pos = $content.IndexOf("slug: `"$slug`"")
    $nextPos = if ($nextSlug -ne "MODULE") { $content.IndexOf("slug: `"$nextSlug`"", $pos + 20) } else { $content.Length }
    if ($nextPos -eq -1) { $nextPos = $content.Length }
    
    $lessonChunk = $content.Substring($pos, $nextPos - $pos)
    
    Write-Output "========================================"
    Write-Output "LESSON: $slug"
    Write-Output "========================================"
    
    # Extract sources
    $srcRegex = [regex]'sources:\s*\[([\s\S]*?)\]\s*,\s*stillStuck:'
    $mSrc = $srcRegex.Match($lessonChunk)
    if ($mSrc.Success) {
        Write-Output "--- SOURCES ---"
        $sMatches = [regex]::Matches($mSrc.Groups[1].Value, 'title:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"')
        foreach ($sm in $sMatches) {
            Write-Output "  [Source] $($sm.Groups[1].Value) --> $($sm.Groups[2].Value)"
        }
    }
    
    # Extract stillStuck
    $stuckRegex = [regex]'stillStuck:\s*\[([\s\S]*?)\]\s*\}\s*(\]|\})'
    $mStuck = $stuckRegex.Match($lessonChunk)
    if ($mStuck.Success) {
        Write-Output "--- STILL STUCK (VIDEOS) ---"
        $stMatches = [regex]::Matches($mStuck.Groups[1].Value, 'title:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"')
        foreach ($stm in $stMatches) {
            Write-Output "  [Video] $($stm.Groups[1].Value) --> $($stm.Groups[2].Value)"
        }
    }
}
