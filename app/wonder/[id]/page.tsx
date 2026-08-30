import { notFound } from "next/navigation";
import { getObservationById, OBSERVATIONS } from "../data";
import FeedItem from "../FeedItem";
import BackButton from "../../components/BackButton";
import { absoluteUrl } from "../../../lib/seo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const obs = getObservationById(id);
  
  if (!obs) {
    return { title: "Not found" };
  }

  const url = `${absoluteUrl("")}/wonder/${id}`;
  // Use our new dynamic OG route
  const ogImage = `${absoluteUrl("")}/api/og/wonder?id=${id}`;

  return {
    title: `${obs.title} — Wonder`,
    description: obs.body.substring(0, 160) + (obs.body.length > 160 ? "..." : ""),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: obs.title,
      description: obs.body.substring(0, 160) + (obs.body.length > 160 ? "..." : ""),
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: obs.title,
      description: obs.body.substring(0, 160) + (obs.body.length > 160 ? "..." : ""),
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return OBSERVATIONS.map((obs) => ({
    id: obs.id,
  }));
}

export default async function WonderSinglePage({ params }: PageProps) {
  const { id } = await params;
  const obs = getObservationById(id);

  if (!obs) {
    return notFound();
  }

  return (
    <main className="max-w-2xl mx-auto my-10 px-4 sm:px-6 md:px-8 py-10">
      <div className="mb-8">
         <BackButton />
      </div>
      
      <div className="border border-hairline bg-surface-1 rounded-xl p-4 md:p-6 shadow-card">
         <FeedItem obs={obs} />
      </div>
    </main>
  );
}
