import { usePlane } from "@react-three/cannon";
import { useRef, useState } from "react";
import type { Mesh } from "three";

export default function Plane() {
  const [ref] = usePlane(
    () => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }),
    useRef<Mesh>(null)
  );
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color="#555555" metalness={0} roughness={0} />
    </mesh>
  );
}
