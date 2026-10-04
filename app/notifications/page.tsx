import PageHeader from "../components/ui/PageHeader";
import NotificationsTab from "../components/NotificationsTab";
import { NOINDEX } from "../../lib/seo";
import type { Metadata } from "next";
import BackButton from "../components/BackButton";

export const metadata: Metadata = {
  title: "Site Updates & Changelog",
  ...NOINDEX,
};

export default function NotificationsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div>
        <div className="mb-8">
          <BackButton />
        </div>
        <PageHeader 
          eyebrow="Updates" 
          title="Site Changelog" 
          description="A running log of how this space is evolving over time."
        />
        
        <div className="mt-12">
          <NotificationsTab />
        </div>
      </div>
    </main>
  );
}
