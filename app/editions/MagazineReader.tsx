"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { masthead } from "./fonts";

export type ReaderEdition = {
  slug: string;
  title: string;
  date: string;
  banner?: string;
  html: string;
};

type Props = {
  title: string;
  tagline: string;
  range: string;
  accent: string;
  cover: ReactNode;
  editions: ReaderEdition[];
};

/** One paragraph, heading, image or list item, laid out whole on a single page. */
type Block = {
  html: string;
  wrap: "top" | "body" | "toc";
  list?: { id: string; ordered: boolean; index: number };
};

type Page =
  | { kind: "cover" }
  | { kind: "end" }
  | { kind: "text"; edition: string | null; blocks: Block[] };

/**
 * The book has one fixed design: every page is this size with this type, so it
 * paginates the same everywhere. Smaller screens show the same book scaled down.
 */
const PAGE = {
  w: 560,
  h: 760,
  padX: 44,
  padTop: 48,
  padBottom: 46,
  font: 19,
};

type Dims = {
  /** Pages side by side: a spread where it fits legibly, one page on phones. */
  per: 1 | 2;
  scale: number;
};

type Flip = { dir: "next" | "prev"; to: number };

const COLUMN_GAP = 40;

function formatDate(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
}

function computeDims(wrapWidth: number, viewportHeight: number): Dims {
  const availH = Math.max(320, viewportHeight - 150);
  const single = Math.min(wrapWidth / PAGE.w, availH / PAGE.h, 1.2);
  const spread = Math.min(wrapWidth / (PAGE.w * 2), availH / PAGE.h, 1.2);
  // When height is the limit a spread is as large as a single page, so show both.
  // Only narrow screens, where a spread's text would get too small, drop to one page.
  if (spread >= single * 0.95 || spread >= 0.6) return { per: 2, scale: spread };
  return { per: 1, scale: single };
}

/** Rebuilds a page's HTML from its blocks, reopening the body and list wrappers they came from. */
function pageHtml(blocks: Block[], pageOf: Record<string, number>) {
  let out = "";
  let wrap: Block["wrap"] | null = null;
  let list: string | null = null;
  const closeList = () => {
    if (list) out += list.startsWith("ol") ? "</ol>" : "</ul>";
    list = null;
  };
  const closeWrap = () => {
    closeList();
    if (wrap === "body") out += "</div>";
    if (wrap === "toc") out += "</ol>";
    wrap = null;
  };

  for (const b of blocks) {
    if (wrap !== b.wrap) {
      closeWrap();
      if (b.wrap === "body") out += '<div class="mzr-body">';
      if (b.wrap === "toc")
        out += `<ol class="mzr-toc" style="counter-reset: toc ${b.list?.index ?? 0}">`;
      wrap = b.wrap;
    }
    if (b.wrap === "body") {
      const key = b.list
        ? `${b.list.ordered ? "ol" : "ul"}:${b.list.id}`
        : null;
      if (list !== key) {
        closeList();
        if (b.list)
          out += b.list.ordered ? `<ol start="${b.list.index + 1}">` : "<ul>";
        list = key;
      }
    }
    out += b.html;
  }
  closeWrap();

  return out.replace(
    /data-toc-page="([^"]+)"><\/span>/g,
    (_, slug: string) => `>${pageOf[slug] ?? ""}</span>`,
  );
}

/**
 * Reads a magazine like a book. The editions are laid out once, offscreen, in
 * columns the size of a page; every block is then placed on the page its column
 * landed on. Turning a page swings a two-sided leaf across the spine.
 */
export default function MagazineReader({
  title,
  tagline,
  range,
  accent,
  cover,
  editions,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<Dims | null>(null);
  // Repaginating depends only on spread vs single page; the scale is purely visual.
  const per = dims?.per;
  const [pages, setPages] = useState<Page[] | null>(null);
  const [view, setView] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const touchX = useRef<number | null>(null);
  // Where the reader is, as an edition and a page within it, so re-paginating
  // after a resize keeps them on the same text rather than the same page number.
  const anchorRef = useRef<{ edition: string | null; within: number }>({
    edition: null,
    within: 0,
  });
  const flipRef = useRef<Flip | null>(null);
  useEffect(() => {
    flipRef.current = flip;
  }, [flip]);

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const next = computeDims(wrap.clientWidth, window.innerHeight);
    setDims((prev) =>
      prev && prev.per === next.per && Math.abs(prev.scale - next.scale) < 0.001
        ? prev
        : next,
    );
  }, []);

  useLayoutEffect(() => {
    resize();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [resize]);

  const paginate = useCallback(() => {
    const flow = measureRef.current;
    if (!flow || !per) return;
    const step = PAGE.w - PAGE.padX * 2 + COLUMN_GAP;
    const left0 = flow.getBoundingClientRect().left;
    const pageIndex = (el: Element) =>
      Math.round((el.getBoundingClientRect().left - left0) / step);

    const placed = new Map<
      number,
      { edition: string | null; blocks: Block[] }
    >();
    const place = (el: Element, edition: string | null, block: Block) => {
      const i = pageIndex(el);
      if (!placed.has(i)) placed.set(i, { edition, blocks: [] });
      placed.get(i)!.blocks.push(block);
    };

    flow
      .querySelectorAll<HTMLElement>(":scope > [data-part]")
      .forEach((part) => {
        const edition = part.dataset.part === "toc" ? null : part.dataset.part!;
        for (const el of Array.from(part.children)) {
          if (el.classList.contains("mzr-toc")) {
            Array.from(el.children).forEach((li, index) =>
              place(li, edition, {
                html: li.outerHTML,
                wrap: "toc",
                list: { id: "toc", ordered: true, index },
              }),
            );
          } else if (el.classList.contains("mzr-body")) {
            Array.from(el.children).forEach((child, n) => {
              if (child.tagName === "UL" || child.tagName === "OL") {
                Array.from(child.children).forEach((li, index) =>
                  place(li, edition, {
                    html: li.outerHTML,
                    wrap: "body",
                    list: {
                      id: `${edition}-${n}`,
                      ordered: child.tagName === "OL",
                      index,
                    },
                  }),
                );
              } else {
                place(child, edition, { html: child.outerHTML, wrap: "body" });
              }
            });
          } else {
            place(el, edition, { html: el.outerHTML, wrap: "top" });
          }
        }
      });

    const textPages: Page[] = [...placed.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, p]) => ({ kind: "text", edition: p.edition, blocks: p.blocks }));
    const next: Page[] = [{ kind: "cover" }, ...textPages, { kind: "end" }];
    setPages(next);

    // A flip in progress lands first; the anchor it sets is restored on the next layout.
    if (flipRef.current) return;
    const { edition, within } = anchorRef.current;
    const start = edition
      ? next.findIndex((p) => p.kind === "text" && p.edition === edition)
      : 0;
    setView(
      viewOf(Math.min(Math.max(start, 0) + within, next.length - 1), per),
    );
  }, [per]);

  useLayoutEffect(() => {
    if (!per) return;
    paginate();
    const flow = measureRef.current!;
    // Fonts and images change what fits on a page, so lay out again once they land.
    let timer: ReturnType<typeof setTimeout>;
    const again = () => {
      clearTimeout(timer);
      timer = setTimeout(paginate, 120);
    };
    flow.addEventListener("load", again, true);
    document.fonts?.ready.then(again);
    return () => {
      clearTimeout(timer);
      flow.removeEventListener("load", again, true);
    };
  }, [per, paginate]);

  const total = pages ? viewOf(pages.length - 1, per ?? 1) + 1 : 1;

  const pageOf = useMemo(() => {
    const map: Record<string, number> = {};
    pages?.forEach((p, i) => {
      if (p.kind === "text" && p.edition && !(p.edition in map))
        map[p.edition] = i;
    });
    return map;
  }, [pages]);

  const pagesInView = (v: number): [number | null, number | null] => {
    if (!pages) return [null, null];
    if (per === 1) return [null, v < pages.length ? v : null];
    if (v === 0) return [null, 0];
    const left = v * 2 - 1;
    return [
      left < pages.length ? left : null,
      left + 1 < pages.length ? left + 1 : null,
    ];
  };

  const settle = useCallback(
    (v: number) => {
      if (!pages) return;
      const [l, r] =
        per === 1 ? [null, v] : v === 0 ? [null, 0] : [v * 2 - 1, v * 2];
      const first =
        [l, r].find(
          (i) => i !== null && i < pages.length && pages[i].kind === "text",
        ) ?? null;
      const edition =
        first !== null
          ? (pages[first] as Extract<Page, { kind: "text" }>).edition
          : null;
      const start = edition
        ? pages.findIndex((p) => p.kind === "text" && p.edition === edition)
        : 0;
      anchorRef.current = {
        edition,
        within: first !== null ? first - start : v * (per ?? 1),
      };
      setView(v);
    },
    [pages, per],
  );

  const turn = useCallback(
    (dir: Flip["dir"]) => {
      if (flip || !pages) return;
      const to = view + (dir === "next" ? 1 : -1);
      if (to < 0 || to >= total) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        settle(to);
      else setFlip({ dir, to });
    },
    [flip, pages, view, total, settle],
  );

  const jumpToPage = useCallback(
    (page: number) => settle(viewOf(page, per ?? 1)),
    [settle, per],
  );

  // Land the page even if the animation never reports finishing (e.g. a background tab).
  useEffect(() => {
    if (!flip) return;
    const timer = setTimeout(() => {
      settle(flip.to);
      setFlip(null);
    }, 1100);
    return () => clearTimeout(timer);
  }, [flip, settle]);

  // Open at the edition named in the URL hash, e.g. /editions/tech-pulse#tech-pulse-3.
  const openedFromHash = useRef(false);
  useEffect(() => {
    if (!pages) return;
    const openHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (slug in pageOf) jumpToPage(pageOf[slug]);
    };
    if (!openedFromHash.current) {
      openedFromHash.current = true;
      openHash();
    }
    window.addEventListener("hashchange", openHash);
    return () => window.removeEventListener("hashchange", openHash);
  }, [pages, pageOf, jumpToPage]);

  const [leftIdx, rightIdx] = pagesInView(view);
  const reading = (() => {
    for (const i of [rightIdx, leftIdx]) {
      const p = i !== null && pages ? pages[i] : null;
      if (p?.kind === "text" && p.edition) return p.edition;
    }
    return null;
  })();

  useEffect(() => {
    if (!pages) return;
    const hash = reading ? `#${reading}` : "";
    if (window.location.hash !== hash)
      history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [reading, pages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest("input, select, textarea")
      )
        return;
      if (e.key === "ArrowRight" || e.key === "PageDown") turn("next");
      if (e.key === "ArrowLeft" || e.key === "PageUp") turn("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  const editionTitle = useMemo(
    () => Object.fromEntries(editions.map((e) => [e.slug, e.title])),
    [editions],
  );

  const renderPage = (
    index: number | null,
    side: "left" | "right",
    key: string,
  ) => {
    if (index === null || !pages) return null;
    const page = pages[index];
    const sideClass = per === 2 ? `mzr-${side}` : "mzr-right";
    if (page.kind === "cover") {
      return (
        <div key={key} className={`mzr-page mzr-page-cover ${sideClass}`}>
          {cover}
        </div>
      );
    }
    if (page.kind === "end") {
      return (
        <div key={key} className={`mzr-page ${sideClass}`}>
          <div className="mzr-endpage">
            <p className={`${masthead.className} mzr-fin`}>The end.</p>
            <p>
              You&apos;ve read all {editions.length} editions of {title}.
            </p>
            <Link href="/editions">Pick another magazine →</Link>
          </div>
        </div>
      );
    }
    return (
      <div key={key} className={`mzr-page ${sideClass}`}>
        <span className="mzr-runhead">
          {page.edition ? editionTitle[page.edition] : title}
        </span>
        <div
          className="mzr-content"
          dangerouslySetInnerHTML={{ __html: pageHtml(page.blocks, pageOf) }}
        />
        <span className="mzr-folio">{index}</span>
      </div>
    );
  };

  // What sits still and what turns, for the current flip.
  let stillLeft = leftIdx;
  let stillRight = rightIdx;
  let leaf: {
    side: "left" | "right";
    front: number | null;
    back: number | null;
    anim: string;
  } | null = null;
  if (flip) {
    const [toL, toR] = pagesInView(flip.to);
    if (per === 2 && flip.dir === "next") {
      stillRight = toR;
      leaf = {
        side: "right",
        front: rightIdx,
        back: toL,
        anim: "mzr-turn-fwd",
      };
    } else if (per === 2) {
      stillLeft = toL;
      leaf = { side: "left", front: leftIdx, back: toR, anim: "mzr-turn-back" };
    } else if (flip.dir === "next") {
      stillRight = toR;
      leaf = {
        side: "right",
        front: rightIdx,
        back: null,
        anim: "mzr-turn-fwd",
      };
    } else {
      leaf = { side: "right", front: toR, back: null, anim: "mzr-turn-in" };
    }
  }

  const contentW = PAGE.w - PAGE.padX * 2;
  const contentH = PAGE.h - PAGE.padTop - PAGE.padBottom;
  // Columns drop margins at a break that a real page keeps, so lay out a line short
  // to make sure every page fits without scrolling or clipping.
  const measureH = contentH - Math.round(PAGE.font * 1.6);
  const scale = dims?.scale ?? 1;
  const style = {
    "--ac": accent,
    "--mzr-page-w": `${PAGE.w}px`,
    "--mzr-page-h": `${PAGE.h}px`,
    "--mzr-content-h": `${contentH}px`,
    "--mzr-pad": `${PAGE.padTop}px ${PAGE.padX}px ${PAGE.padBottom}px`,
    "--mzr-font": `${PAGE.font}px`,
  } as CSSProperties;

  const firstShown = leftIdx ?? rightIdx ?? 0;
  const lastShown = rightIdx ?? leftIdx ?? 0;

  return (
    <main
      className="mx-auto max-w-[1240px] px-3 sm:px-6 py-2 md:py-3"
      style={style}
    >
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <Link
          href="/editions"
          className="text-sm font-semibold text-ink-3 hover:text-ink-1 transition-colors"
        >
          ← The shelf
        </Link>
        <p className="m-0 text-sm text-ink-3">
          <span className={`${masthead.className} text-lg text-ink-1`}>
            {title}
          </span>
          <span className="hidden sm:inline"> · {range}</span>
        </p>
      </div>

      <div ref={wrapRef} className="relative">
        {/* Offscreen layout pass: page-sized columns decide where every block lands. */}
        <div className="mzr-measure-clip" aria-hidden="true">
          <div
            ref={measureRef}
            className="mzr-measure"
            style={{
              width: contentW,
              height: measureH,
              columnWidth: contentW,
              columnGap: COLUMN_GAP,
            }}
          >
            <section data-part="toc">
              <p className="mzr-kicker">In this magazine</p>
              <h1 className={`mzr-contents-title ${masthead.className}`}>
                {title}
              </h1>
              {tagline && <p className="mzr-tagline">{tagline}</p>}
              <ol className="mzr-toc">
                {editions.map((e) => (
                  <li key={e.slug}>
                    <button type="button" data-goto={e.slug}>
                      <span className="mzr-toc-title">{e.title}</span>
                      <span
                        className="mzr-toc-page"
                        data-toc-page={e.slug}
                      ></span>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
            {editions.map((e) => (
              <article key={e.slug} data-part={e.slug}>
                {e.banner && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="mzr-opener" src={e.banner} alt="" />
                )}
                <p className="mzr-kicker">{formatDate(e.date)}</p>
                <h2 className={`mzr-headline ${masthead.className}`}>
                  {e.title}
                </h2>
                <div
                  className="mzr-body"
                  dangerouslySetInnerHTML={{ __html: e.html }}
                />
                <p className="mzr-end">
                  <a href={`/post/${e.slug}`}>Open as a single post ↗</a>
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          className="mzr-frame"
          style={{
            width: PAGE.w * (per ?? 1) * scale,
            height: PAGE.h * scale,
            visibility: dims ? "visible" : "hidden",
          }}
        >
          <div
            className={`mzr-stage ${per === 2 ? "mzr-two" : "mzr-one"}`}
            style={{
              width: PAGE.w * (per ?? 1),
              height: PAGE.h,
              transform: `scale(${scale})`,
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const goto = target.closest<HTMLElement>("[data-goto]");
              if (goto && goto.dataset.goto! in pageOf)
                return jumpToPage(pageOf[goto.dataset.goto!]);
              if (target.closest("a, button, select")) return;
              // Tapping near an outer edge turns the page, like grabbing its corner.
              const box = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - box.left) / box.width;
              if (x > 0.8) turn("next");
              else if (x < 0.2) turn("prev");
            }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) turn(dx < 0 ? "next" : "prev");
              touchX.current = null;
            }}
          >
            {!pages && <p className="mzr-loading">Binding the pages…</p>}
            {pages && (
              <>
                {per === 2 && renderPage(stillLeft, "left", `l-${stillLeft}`)}
                {renderPage(stillRight, "right", `r-${stillRight}`)}
                {leaf && (
                  <div
                    key={`${flip!.dir}-${flip!.to}`}
                    className={`mzr-leaf mzr-leaf-${leaf.side}`}
                    style={{ animationName: leaf.anim }}
                    onAnimationEnd={(e) => {
                      if (e.target !== e.currentTarget) return;
                      settle(flip!.to);
                      setFlip(null);
                    }}
                    aria-hidden="true"
                  >
                    <div className="mzr-face mzr-face-front">
                      {renderPage(leaf.front, leaf.side, "front")}
                    </div>
                    <div className="mzr-face mzr-face-back">
                      {renderPage(
                        leaf.back,
                        leaf.side === "right" ? "left" : "right",
                        "back",
                      ) ?? <div className="mzr-page mzr-page-back" />}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <nav
        className="mx-auto mt-4 flex max-w-[1160px] items-center justify-between gap-2 sm:gap-3"
        aria-label="Turn pages"
      >
        <button
          type="button"
          className="mzr-turn"
          onClick={() => turn("prev")}
          disabled={view === 0}
          aria-label="Previous page"
        >
          ← <span className="hidden sm:inline">Previous</span>
        </button>
        <select
          className="mzr-jump"
          aria-label="Jump to an edition"
          value={reading ?? ""}
          onChange={(e) =>
            e.target.value in pageOf
              ? jumpToPage(pageOf[e.target.value])
              : settle(0)
          }
        >
          <option value="">Cover & contents</option>
          {editions.map((e) => (
            <option key={e.slug} value={e.slug}>
              {e.title}
            </option>
          ))}
        </select>
        <span className="hidden md:inline text-sm text-ink-3 tabular-nums">
          {pages && lastShown > 0
            ? `Page ${Math.max(firstShown, 1)}${lastShown > Math.max(firstShown, 1) ? `–${lastShown}` : ""} of ${pages.length - 1}`
            : "Cover"}
        </span>
        <button
          type="button"
          className="mzr-turn"
          onClick={() => turn("next")}
          disabled={view >= total - 1}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span> →
        </button>
      </nav>
    </main>
  );
}

/** The view (a spread of two, or a single page on phones) that shows a given page. */
function viewOf(page: number, per: 1 | 2) {
  return per === 1 ? page : page === 0 ? 0 : Math.floor((page + 1) / 2);
}
