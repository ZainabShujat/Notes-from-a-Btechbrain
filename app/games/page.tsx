import PageHeader from "../components/ui/PageHeader";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Games",
  description: "Playable browser games made from scratch.",
  path: "/games",
});

const GAMES = [
  {
    id: "suika-lite",
    title: "Suika Lite",
    description: "Drop fruits, watch them bounce, and merge identical ones. Built with Matter.js and p5.js.",
    url: "https://zainabshujat.github.io/Suika-Lite/",
  },
  {
    id: "ant-smasher",
    title: "Ant Smasher",
    description: "Smash the ants before they escape! A simple arcade game built for the web.",
    url: "https://zainabshujat.github.io/ant-smasher/",
  },
];

export default function GamesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <PageHeader
        eyebrow="🎮 What I Play"
        title="Games"
        description="Browser games I've built. Play them right here."
      />

      <div className="flex flex-col gap-12 mt-12">
        {GAMES.map((game) => (
          <section key={game.id} className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ink-1">{game.title}</h2>
              <p className="text-ink-2 mt-1">{game.description}</p>
            </div>
            
            {/* Game Container */}
            <div className="w-full aspect-video md:aspect-[16/10] bg-black rounded-xl overflow-hidden border border-hairline shadow-card relative group">
              <iframe
                src={game.url}
                title={game.title}
                className="absolute inset-0 w-full h-full border-none"
                loading="lazy"
                allow="fullscreen; autoplay; keyboard"
                tabIndex={0}
              />
              {/* Fallback overlay in case github pages isn't active or fails to load, users can click to open in new tab */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-1/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-ink-1 border border-hairline hover:bg-surface-2 transition-colors pointer-events-auto"
                >
                  Open in new tab ↗
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
