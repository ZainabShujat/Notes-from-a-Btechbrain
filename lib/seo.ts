import type { Metadata } from "next";

/**
 * One source of truth for how the site describes itself.
 * The brand string appears in every page title, so it lives here rather
 * than being retyped ("Notes Brain", "Notes From a B Tech Brain", …).
 */
export const SITE_NAME = "Notes From a BTech Brain";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://btechbrain.zainabshujat.dev";

export const SITE_DESCRIPTION =
  "An intellectual home exploring writing, building, careers, curiosity, and the chaos of figuring things out — by Zainab Shujat.";

export const AUTHOR_NAME = "Zainab Shujat";

/** Used when a page has no artwork of its own. */
export const DEFAULT_OG_IMAGE = "/thumbnail.png";

/** Turn any local or remote asset path into an absolute URL for OG tags. */
export function absoluteUrl(path?: string | null) {
  if (!path) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/browse". Used for the canonical URL. */
  path: string;
  image?: string | null;
};

/**
 * Standard metadata for a static page: canonical URL, Open Graph and
 * a large-image Twitter card. Article pages build on this with
 * publication dates and tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Pages that should never appear in search results. */
export const NOINDEX: Metadata = {
  robots: { index: false, follow: false },
};
