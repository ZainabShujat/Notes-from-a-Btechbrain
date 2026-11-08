import type { CSSProperties } from "react";
import type { Reel } from "../../lib/reels";

/** The reel's cover, or a title card in its accent colour when it has none. */
export default function ReelCover({ reel, className = "" }: { reel: Reel; className?: string }) {
  if (reel.cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={reel.cover} alt="" loading="lazy" className={`aspect-[9/16] w-full object-cover ${className}`} />
    );
  }
  return (
    <div
      aria-hidden="true"
      style={{ "--ac": reel.accent } as CSSProperties}
      className={`flex aspect-[9/16] w-full flex-col justify-between bg-[radial-gradient(120%_80%_at_20%_0%,color-mix(in_srgb,var(--ac)_45%,transparent),#0c0a14_70%)] p-4 ${className}`}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ac)]">Notes From a B.Tech Brain</span>
      <span className="text-xl font-black leading-tight text-white sm:text-2xl">{reel.title}</span>
      <span className="h-1.5 w-10 rounded-full bg-[var(--ac)]" />
    </div>
  );
}
