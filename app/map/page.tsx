import BrainMap from "./BrainMap";
import { generateMapData } from "../../lib/generateMapData";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Brain Map",
  description: "Explore the connected editions, Wander notes, notebooks, lessons, and interactive experiences across Notes From a B.Tech Brain.",
  path: "/map",
});

export default async function MapPage() {
  const data = await generateMapData();
  return <BrainMap data={data} />;
}
