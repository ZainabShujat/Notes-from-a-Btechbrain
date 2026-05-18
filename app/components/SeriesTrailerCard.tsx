import Link from "next/link";

type Props = {
  title: string;
  description: string;
  editionCount: string;
  launchTimeline: string;
  color: {
    base: string;
    glow: string;
  }
  tagline?: string;
};

export default function SeriesTrailerCard({
  title,
  description,
  editionCount,
  launchTimeline,
  color,
  tagline,
}: Props) {
  return (
    <div
      className={`relative bg-white dark:bg-slate-900/90 shadow-md hover:shadow-lg transition-shadow rounded-lg border-t-4 ${color} p-6`}
    >
      {/* Coming Soon Badge */}
      <div className="absolute top-4 right-4">
        <span className="inline-block bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          COMING SOON
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>

      {/* Tagline */}
      {tagline && (
        <p className="text-sm italic text-slate-600 dark:text-slate-200 mb-3">{tagline}</p>
      )}

      {/* Edition Count & Timeline */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium px-3 py-1 rounded-full">
          📚 {editionCount}
        </span>
        <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium px-3 py-1 rounded-full">
          📅 {launchTimeline}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-700 dark:text-slate-200 text-sm mb-4">{description}</p>

      {/* Call to Action */}
      <div className="text-purple-700 dark:text-purple-200 text-sm font-semibold">
        Stay tuned →
      </div>
    </div>
  );
}
