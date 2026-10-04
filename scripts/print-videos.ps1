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
    
    $chunk = $content.Substring($pos, $nextPos - $pos)
    
    Write-Output "=== $slug ==="
    $vMatches = [regex]::Matches($chunk, 'title:\s*"([^"]+)"[\s\S]*?creator:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"')
    foreach ($vm in $vMatches) {
        Write-Output "   [$($vm.Groups[2].Value)] $($vm.Groups[1].Value) --> $($vm.Groups[3].Value)"
    }
}
