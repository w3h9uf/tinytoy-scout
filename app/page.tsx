import { ToyScout } from "@/components/toy-scout";
import { toyItems } from "@/lib/toys";

export default function Home() {
  return <ToyScout toys={toyItems} />;
}
