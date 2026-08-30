export type Observation = {
  id: string;
  title: string;
  body: string;
  date: string;
};

export const OBSERVATIONS: Observation[] = [
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
