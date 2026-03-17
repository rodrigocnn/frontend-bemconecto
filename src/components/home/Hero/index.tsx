import Image from "next/image";

import topo from "./../assets/img/topo.webp";
import { SearchProperty } from "../SearchProperty";

export function Hero() {
  return (
    <div className="h-96 mb-12 relative">
      <Image
        src={topo}
        alt="Imagem de destaque"
        fill
        className="object-cover"
      />

      <SearchProperty />
    </div>
  );
}
