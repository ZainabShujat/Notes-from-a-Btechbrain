"use client";

import { useState, useMemo } from "react";
import FeedItem from "./FeedItem";
import type { Observation } from "./data";
import Button from "../components/ui/Button";

type WonderFeedProps = {
  observations: Observation[];
};

const ITEMS_PER_PAGE = 10;

export default function WonderFeed({ observations }: WonderFeedProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleObservations = useMemo(() => {
    return observations.slice(0, visibleCount);
  }, [observations, visibleCount]);

  const grouped = useMemo(() => {
    const groups: Record<string, Observation[]> = {};
    visibleObservations.forEach((obs) => {
      const date = new Date(obs.date);
      const key = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (!groups[key]) groups[key] = [];
      groups[key].push(obs);
    });
    return groups;
  }, [visibleObservations]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const hasMore = visibleCount < observations.length;

  return (
    <div className="flex flex-col mt-8">
      {Object.entries(grouped).map(([monthYear, obsList]) => (
        <div key={monthYear} className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-ink-3 mb-4 pl-4 md:pl-6 border-l-2 border-hairline-strong">
            {monthYear}
          </h3>
          <div className="flex flex-col border-t border-hairline">
            {obsList.map((obs) => (
              <FeedItem key={obs.id} obs={obs} />
            ))}
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button variant="secondary" onClick={handleLoadMore}>
            Load More Thoughts
          </Button>
        </div>
      )}
    </div>
  );
}
