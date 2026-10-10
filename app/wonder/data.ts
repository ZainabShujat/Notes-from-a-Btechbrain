export type Observation = {
  id: string;
  title: string;
  body: string;
  date: string;
};

export const OBSERVATIONS: Observation[] = [
  {
    id: "writing-notes-friction",
    title: "Writing Notes in Your Own Words Is the Hard Part",
    body: "Reading someone else's clean summary gives you the cheap feeling of mastery. But the second you open a blank folio and try to explain the mechanism yourself, the illusion breaks. You don't actually understand a concept until you can reconstruct it for the confused version of you from two weeks ago.",
    date: "2026-10-10",
  },
  {
    id: "reinventing-the-wheel",
    title: "Developers Don't Build To-Do Apps for the List",
    body: "Another to-do app, another notes app, another counter with a slightly different CSS gradient. The internet has ten thousand of them, yet programmers keep building them from scratch. We don't build them because the world lacks task trackers; we build them because rebuilding the familiar is the safest sandbox to understand how data actually moves.",
    date: "2026-10-08",
  },
  {
    id: "two-am-coding",
    title: "Failure Lands Differently After Midnight",
    body: "At 2 PM, a crashing build feels like proof of incompetence. But at 2 AM, when notifications die down and nobody is expecting a reply, failure suddenly feels light. There's a strange permission in the dark to try something unproven, break it completely, and fix it without having to explain yourself to anyone.",
    date: "2026-10-05",
  },
  {
    id: "debugging-therapy",
    title: "Debugging Is the Only Problem That Ignores Drama",
    body: "You cannot rush a bug. You cannot cry at the compiler and expect it to heal. You can be deeply overwhelmed, but the error message will still sit there, completely indifferent to your panic. Debugging forces the one transition modern life avoids: moving from reacting to simply examining what is actually there.",
    date: "2026-10-02",
  },
  {
    id: "handwriting-friction",
    title: "Typing Records; Handwriting Decides",
    body: "Your fingers on a keyboard can outrun your thoughts, capturing words you haven't even processed. But ink on paper is too slow to transcribe verbatim. It forces an instant editorial filter in your brain: summarize, discard the fluff, or watch your hand cramp. Handwriting forces comprehension through physical friction.",
    date: "2026-09-29",
  },
  {
    id: "talking-to-objects",
    title: "We Treat Inanimate Things Like They Have Moods",
    body: "We gently tap laptops when they freeze, apologize to doorframes when we bump into them, and beg chargers to stay bent at that one magical angle. We know circuits don't feel empathy, but our brains are pattern-matching engines that would rather assume intention than face indifferent mechanics.",
    date: "2026-09-26",
  },
  {
    id: "vibe-coding-trap",
    title: "Generating Code Isn't the Same as Owning It",
    body: "It feels intoxicating when an AI auto-completes forty lines of complex logic in three seconds. You feel like an architect orchestrating a symphony. But the moment something behaves unexpectedly in production, the catch becomes clear: you didn't write the symphony, and now you have to debug someone else's magic.",
    date: "2026-09-23",
  },
  {
    id: "looking-smart-vs-curious",
    title: "The Need to Look Smart Quietly Kills Curiosity",
    body: "Children ask questions because they genuinely don't know. Adults hesitate because asking exposes the fact that they don't know. Somewhere in school, we traded the joy of finding things out for the anxious performance of appearing already informed.",
    date: "2026-09-20",
  },
  {
    id: "brain-pattern-engine",
    title: "Your Brain Hates Coincidences",
    body: "You see a face in the burnt crust of toast, or hear a whisper in the static hum of an air conditioner. The human brain is an aggressive prediction engine that would rather invent meaning where none exists than admit it is staring at random noise.",
    date: "2026-09-17",
  },
  {
    id: "time-speeding-up",
    title: "Time Moves Faster When Everything Stays the Same",
    body: "Summer vacations in childhood felt like entire lifetimes because every single week held novelty: a new street, a new game, a scraped knee. When adult life settles into identical commutes and repeated routines, the brain compresses the days into a single memory block. Time doesn't speed up; our days just stop being distinct.",
    date: "2026-09-14",
  },
  {
    id: "prime-number-mystique",
    title: "Prime Numbers Feel Like Secrets in Plain Sight",
    body: "They are the atomic building blocks of arithmetic, yet their appearance along the number line resembles scattered gravel rather than a tidy parade. We use them to secure every banking transaction on Earth, fully aware that mathematics still cannot predict when the next giant prime will arrive.",
    date: "2026-09-11",
  },
  {
    id: "deja-vu-routing",
    title: "Déjà Vu Is Just Memory Lagging Behind Sensation",
    body: "For one dizzying second, you swear you've stood in this exact hallway, hearing this exact laugh. It feels cinematic, almost psychic. In reality, it's just a routing hiccup in the temporal lobe: the brain accidentally filed the present moment straight into long-term storage before conscious awareness finished processing it.",
    date: "2026-09-08",
  },
  {
    id: "quiet-skills",
    title: "The Most Valuable Skills Never Announce Themselves",
    body: "We celebrate the loud skills: charismatic pitch decks, flashy launch tweets, and trendy framework migrations. But systems survive on the quiet ones: naming variables clearly, reading the error logs before panicking, and having the discipline to document the one edge case that breaks at 4 AM.",
    date: "2026-09-05",
  },
  {
    id: "browser-tab-graveyard",
    title: "Browser Tabs Are Cemeteries of Good Intentions",
    body: "We keep 47 browser tabs open not because we're reading them, but because closing them feels like admitting we'll never become the version of ourselves who needed that article on distributed databases. Every pinned tab is an aspirational future self refusing to be archived.",
    date: "2026-09-02",
  },
  {
    id: "blinking-cursor",
    title: "The cursor knows when you're thinking",
    body: "A blinking text cursor is doing almost nothing, yet we rarely notice how much it changes a blank screen. Without it, an empty text box feels unfinished; with it, the same emptiness feels like an invitation. One tiny animation quietly tells your brain: something is waiting to become a thought.",
    date: "2026-08-30",
  },
  {
    id: "notification-anxiety",
    title: "Notification Anxiety Is a Design Choice",
    body: "Every red badge on your phone is someone's product decision to make you feel behind. The number isn't urgent. The colour is.",
    date: "2026-08-15",
  },
  {
    id: "linkedin-language",
    title: "LinkedIn Has Its Own Language",
    body: "Nobody in real life says 'I'm thrilled to announce.' But on LinkedIn, if you don't say it, you sound ungrateful. The platform invented an emotion that only exists within itself.",
    date: "2026-08-10",
  },
  {
    id: "tutorial-hell",
    title: "Tutorial Hell Is Comfortable Procrastination",
    body: "You watch the tutorial. You feel like you've learned. You haven't built anything. Three months later you watch the same tutorial again and it feels new. The loop is the product.",
    date: "2026-07-28",
  },
  {
    id: "wifi-personality",
    title: "Every Café's WiFi Tells You Something",
    body: "Fast WiFi with no password: 'we trust you.' Slow WiFi with a receipt code: 'buy something first.' No WiFi: 'talk to each other, you animals.'",
    date: "2026-07-20",
  },
  {
    id: "dark-mode-identity",
    title: "Dark Mode Became an Identity",
    body: "It started as 'easier on the eyes.' Now people will judge your entire personality based on whether your phone is in dark mode or light mode. We turned a settings toggle into a moral stance.",
    date: "2026-07-12",
  },
  {
    id: "algorithm-loop",
    title: "The Algorithm Knows You Better Than You Know Yourself",
    body: "You scroll past 200 posts. You stop on one for 4 seconds. The algorithm noticed. You didn't. Now your entire feed has shifted and you don't know why. You think you chose this. You didn't.",
    date: "2026-06-30",
  },
  {
    id: "online-vs-real",
    title: "Your Online Self Is a Character You Wrote",
    body: "You curate your posts. You choose which thoughts to share. You filter your photos. You're essentially writing a character — one based on you, but edited. The question is whether you still remember the difference.",
    date: "2026-06-18",
  },
];

export function getObservationById(id: string): Observation | undefined {
  return OBSERVATIONS.find((obs) => obs.id === id);
}
