$content = Get-Content 'lib\courses\os-data.ts' -Raw

# Find all lessons with their slug and quick-revision / cheatsheet information
$lessonMatches = [regex]::Matches($content, 'slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)"')
Write-Output "Scanning all lessons..."

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

foreach ($slug in $slugs) {
    # Check if lesson has quick-revision
    $pattern = [regex]"(?s)slug:\s*`"$slug`".*?type:\s*`"quick-revision`".*?coreRule:\s*`"([^`"]+)`""
    $m = $pattern.Match($content)
    $hasRev = if ($m.Success) { "YES" } else { "NO" }
    
    # Check if lesson has stillStuck
    $patternStuck = [regex]"(?s)slug:\s*`"$slug`".*?stillStuck:\s*\[(.*?)\]"
    $mStuck = $patternStuck.Match($content)
    $hasStuck = if ($mStuck.Success) { "YES" } else { "NO" }
    
    Write-Output "Lesson: $slug | QuickRev: $hasRev | StillStuck: $hasStuck"
}
