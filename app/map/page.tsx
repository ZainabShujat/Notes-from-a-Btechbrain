import BrainMap from "./BrainMap";
import { generateMapData } from "../../lib/generateMapData";

export default async function MapPage() {
  const clusters = await generateMapData();

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <BrainMap clusters={clusters} />
    </main>
  );
}
