import type { CSSProperties } from "react";
import { titleInMagazine, type Magazine } from "../../lib/magazines";
import { masthead } from "./fonts";

type Props = {
  magazine: Magazine;
  /** "lg" adds cover lines with the latest titles, for the magazine page. */
  size?: "md" | "lg";
};

/**
 * A magazine cover built as a collage: the newest edition's banner fills
 * the cover and up to three older banners are pinned on top as cut-outs.
 * The page edge gets thicker the more editions the magazine holds.
 */
export default function MagazineCover({ magazine, size = "md" }: Props) {
  const withBanners = magazine.posts.filter((p) => p.banner);
  const newestFirst = [...withBanners].reverse();
  const hero = newestFirst[0];
  const cutouts = newestFirst.slice(1, 4);
  const coverLines = [...magazine.posts].reverse().slice(0, 2);
  const count = magazine.posts.length;

  return (
    <div
      className={`mz-book mz-${size}`}
      style={{ "--ac": magazine.accent, "--pages": `${Math.min(4 + count * 0.6, 14)}px` } as CSSProperties}
    >
      <div className="mz-cover">
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="mz-hero" src={hero.banner} alt="" loading="lazy" />
        )}
        <div className="mz-shade" />

        <div className="mz-mast">
          <span className="mz-kicker">Notes From a B.Tech Brain</span>
          <h3 className={`mz-title ${magazine.title.length > 16 ? "mz-title-long" : ""} ${masthead.className}`}>{magazine.title}</h3>
        </div>

        <div className="mz-cutouts" aria-hidden="true">
          {cutouts.map((post) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={post.slug} src={post.banner} alt="" loading="lazy" />
          ))}
        </div>

        {size === "lg" && (
          <ul className="mz-lines">
            {coverLines.map((post) => (
              <li key={post.slug}>{titleInMagazine(post.title, magazine.title)}</li>
            ))}
          </ul>
        )}

        <span className="mz-band">
          {count} edition{count === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
