
import BrainMap from "./BrainMap";
import { generateMapData } from "../../lib/generateMapData";

export default async function MapPage() {
  const clusters = await generateMapData();

  return (
    <main className="h-[calc(100svh-92px)] overflow-hidden bg-[#050816] text-white md:h-[calc(100svh-104px)]">
      <BrainMap clusters={clusters} />
    </main>
  );
}

