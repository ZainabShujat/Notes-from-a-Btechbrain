import BrainMap from "./BrainMap";
import { generateMapData } from "../../lib/generateMapData";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Brain Map",
  description:
    "An interactive map of recurring ideas and the connections between them across every article on the site.",
  path: "/map",
});

export default async function MapPage() {
  const clusters = await generateMapData();

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <BrainMap clusters={clusters} />
    </main>
  );
}
